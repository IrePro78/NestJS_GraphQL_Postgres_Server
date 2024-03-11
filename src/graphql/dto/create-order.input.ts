import { Field, Float, InputType } from '@nestjs/graphql';

@InputType({ description: 'Create product input object type.' })
export class CreateOrderInput {
	@Field(() => Float)
	totalAmount?: number;
}
