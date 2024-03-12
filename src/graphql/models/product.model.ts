import {
	BaseEntity,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Collection } from './collection.model';
import { OrderItems } from './order-items.model';
import { Category } from './category.model';

@Entity('products')
@ObjectType()
export class Product extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID, {
		description: 'Unique identifier of the product',
	})
	id: string;
	@Column()
	@Field({ description: 'Name of the product' })
	name: string;
	@Column()
	@Field({
		nullable: true,
		description: 'Description of the product',
	})
	description: string;
	@Column({ type: 'double precision' })
	@Field(() => Float, { description: 'Price of the product' })
	price: number;
	@Column()
	@Field({ description: 'Image of the product' })
	product_image: string;
	@Column()
	@Field({ description: 'Slug of the product' })
	slug: string;

	@ManyToMany(() => Category, (category) => category.products, {
		cascade: true,
	})
	@JoinTable()
	categories: Category[];

	@ManyToMany(() => Collection, (collection) => collection.products, {
		cascade: true,
	})
	@JoinTable()
	collections?: Collection[];

	@OneToMany(() => OrderItems, (orderItems) => orderItems.product, {
		cascade: true,
	})
	orderItems?: OrderItems[];
}
