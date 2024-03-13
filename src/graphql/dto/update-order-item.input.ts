import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'Update order item input object type.' })
export class UpdateOrderItemInput {
	@Field(() => ID)
	itemId: string;
	@Field(() => Int)
	quantity: number;
}
