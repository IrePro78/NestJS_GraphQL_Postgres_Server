import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ description: 'Create Review Input' })
export class CreateReviewInput {
	@Field()
	title: string;
	@Field()
	content: string;
	@Field()
	rating: number;
	@Field()
	name: string;
	@Field()
	email: string;
	@Field(() => ID)
	productId: string;
}
