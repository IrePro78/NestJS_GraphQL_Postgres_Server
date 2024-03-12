import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderItems } from 'src/graphql/models/order-items.model';
import { Product } from 'src/graphql/models/product.model';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';

@Resolver(() => OrderItems)
export class OrderItemsResolver {
	constructor(
		private readonly orderService: OrdersService,
		private readonly productService: ProductsService,
	) {}

	@ResolveField(() => [Product], {
		name: 'product',
		description: 'Get Product By Order Items ID',
		nullable: true,
	})
	async getOrderItems(@Parent() orderItems: OrderItems) {
		return this.productService.findProductsByOrderItemsId(
			orderItems.id,
		);
	}
}
