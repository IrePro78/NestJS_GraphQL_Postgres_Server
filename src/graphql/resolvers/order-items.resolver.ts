import {
	Args,
	ID,
	Mutation,
	Parent,
	ResolveField,
	Resolver,
} from '@nestjs/graphql';
import { CreateOrderItemInput } from 'src/graphql/dto/create-order-item.input';

import { UpdateOrderItemInput } from 'src/graphql/dto/update-order-item.input';
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
		return this.productService.findProductByOrderItemsId(
			orderItems.id,
		);
	}

	@Mutation(() => OrderItems, {
		name: 'createOrderItem',
		description: 'Create Order Item',
		nullable: true,
	})
	async createOrderItem(
		@Args('createOrderItemData')
		createOrderItemData: CreateOrderItemInput,
	): Promise<OrderItems> {
		return this.orderService.createOrderItem(createOrderItemData);
	}

	@Mutation(() => OrderItems, {
		name: 'updateOrderItem',
		description: 'Update Order Item By Order ID',
		nullable: true,
	})
	async updateOrderItem(
		@Args('updateOrderItemData')
		updateOrderItemData: UpdateOrderItemInput,
	): Promise<OrderItems> {
		return this.orderService.updateOrderItem(updateOrderItemData);
	}

	@Mutation(() => OrderItems, {
		name: 'removeOrderItem',
		description: 'Remove Order Item By ID',
		nullable: true,
	})
	async removeOrderItem(
		@Args('itemId', { type: () => ID }) itemId: string,
	) {
		return this.orderService.removeOrderItem(itemId);
	}
}
