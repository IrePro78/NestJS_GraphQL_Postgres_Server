// import { Field, ID, ObjectType } from '@nestjs/graphql';
// import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Product } from './product.model';
// import { Category } from './categories.model';
//
// @Entity('products_categories')
// @ObjectType()
// export class ProductCategorie extends BaseEntity {
//   @PrimaryGeneratedColumn('uuid')
//   @Field(() => ID, { description: 'Unique identifier of the product category' })
//   id: string;
//
//   @ManyToOne(() => Product, (product) => product)
//   product: Product;
//
//   @ManyToOne(() => Category, (category) => category)
//   category: Category;
// }
