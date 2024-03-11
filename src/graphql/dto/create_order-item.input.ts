import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'Create order item input object type.' })
export class CreateOrderItemInput {
	@Field(() => ID)
	orderId: string;
	@Field(() => ID)
	productId: string;
	@Field(() => Int)
	quantity: number;
}
