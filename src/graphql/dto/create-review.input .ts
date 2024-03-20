import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'Create Review Input' })
export class CreateReviewInput {
	@Field()
	headline: string;
	@Field()
	content: string;
	@Field(() => Int)
	rating: number;
	@Field()
	name: string;
	@Field()
	email: string;
	@Field(() => ID)
	productId: string;
}
