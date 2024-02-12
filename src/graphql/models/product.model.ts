import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Collection } from './collection.model';

@ObjectType()
export class Product {
  @Field(() => ID, { description: 'Unique identifier of the product' })
  id: string;

  @Field({ description: 'Name of the product' })
  name: string;

  @Field({ nullable: true, description: 'Description of the product' })
  description: string;

  @Field(() => Int, { description: 'Price of the product' })
  price: number;

  @Field({ description: 'Image of the product' })
  product_image: string;
  // collections: Collection[];
}
