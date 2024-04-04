import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/graphql/models/product.model';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

export enum Rating {
	ZERO = 0,
	ONE,
	TWO,
	TREE,
	FOUR,
	FIVE,
}

@Entity('reviews')
@ObjectType()
export class Review extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID, { description: 'Unique identifier of the review' })
	id: string;

	@Column()
	@Field({ description: 'Name of the review' })
	headline: string;

	@Column()
	@Field({
		nullable: true,
		description: 'Description of the review',
	})
	content: string;

	@Column({ type: 'int', default: 0 })
	@Field({ description: 'Rating of the review' })
	rating: number;

	@Column()
	@Field({ description: 'User name of the review' })
	name: string;

	@Column()
	@Field({ description: 'Email of the review user' })
	email: string;

	@CreateDateColumn({ type: 'timestamp' })
	@Field(() => Date, { description: 'Date of the review' })
	createAt: Date;

	@ManyToOne(() => Product, (product) => product)
	product: Product;
}
