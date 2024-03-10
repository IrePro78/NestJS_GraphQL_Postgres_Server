import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.model';

@Entity('collections')
@ObjectType()
export class Collection extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID, {
		description: 'Unique identifier of the collection',
	})
	id: string;

	@Column()
	@Field({ description: 'Name of the collection' })
	name: string;

	@Column()
	@Field({
		nullable: true,
		description: 'Description of the collection',
	})
	description: string;

	@Column()
	@Field({ description: 'Slug of the collection' })
	slug: string;

	@ManyToMany(() => Product, (product) => product.collections)
	products: Product[];
}
