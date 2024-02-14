import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Create product input object type.' })
export class CreateProductInput {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  price: number;
  @Field()
  product_image: string;
  @Field()
  category_id: string;
}
