import {
	Args,
	ID,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from '@nestjs/graphql';
import { CreateOrderInput } from 'src/graphql/dto/create-order.input';
import { CreateOrderItemInput } from 'src/graphql/dto/create-order-item.input';
import { OrderItems } from 'src/graphql/models/order-items.model';
import { Order } from 'src/graphql/models/order.model';

import { OrdersService } from 'src/orders/orders.service';

@Resolver(() => Order)
export class OrdersResolver {
	constructor(private readonly orderService: OrdersService) {}

	@Query(() => [Order], {
		name: 'orders',
		description: 'Get All Orders',
		nullable: true,
	})
	async getOrders(): Promise<Order[]> {
		return this.orderService.findAll();
	}

	@Query(() => Order, {
		name: 'order',
		description: 'Get Order By ID',
		nullable: true,
	})
	async getOrderById(
		@Args('id', { type: () => ID }) id: string,
	): Promise<Order> {
		return this.orderService.findOneById(id);
	}

	@ResolveField(() => [OrderItems], {
		name: 'orderItems',
		description: 'Get Order Items By Order',
		nullable: true,
	})
	async getOrderItems(@Parent() order: Order) {
		return this.orderService.findByOrderId(order.id);
	}

	@Mutation(() => Order, {
		name: 'createOrder',
		description: 'Create Order',
		nullable: true,
	})
	async createOrder(
		@Args('createOrderData')
		createOrderData: CreateOrderInput,
	): Promise<Order> {
		return this.orderService.create(createOrderData);
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
}
