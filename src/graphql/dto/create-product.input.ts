import { Field, InputType, Float } from '@nestjs/graphql';

@InputType({ description: 'Create product input object type.' })
export class CreateProductInput {
	@Field()
	name: string;
	@Field()
	description: string;
	@Field(() => Float)
	price: number;
	@Field()
	product_image: string;
	@Field()
	slug: string;
	@Field(() => [String])
	category_id: string[];
}
