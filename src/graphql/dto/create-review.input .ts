import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ description: 'Create product input object type.' })
export class CreateReviewInput {
	@Field()
	title: string;
	@Field()
	content: string;
	@Field()
	rating: string;
	@Field()
	name: string;
	@Field()
	email: string;
	@Field(() => ID)
	productId: string;
}
