import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './categories.model';
import { Collection } from './collection.model';
import { OrderItems } from './order-items.model';

@Entity('products')
@ObjectType()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Unique identifier of the product' })
  id: string;
  @Column()
  @Field({ description: 'Name of the product' })
  name: string;
  @Column()
  @Field({ nullable: true, description: 'Description of the product' })
  description: string;
  @Column()
  @Field(() => Int, { description: 'Price of the product' })
  price: number;
  @Column()
  @Field({ description: 'Image of the product' })
  product_image: string;

  @Column()
  @Field({ description: 'Category ID of the product' })
  category_id: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Collection)
  collections?: Collection[];

  @OneToMany(() => OrderItems, (orderItems) => orderItems)
  orderItems?: OrderItems[];
}
