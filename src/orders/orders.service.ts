import { Injectable } from '@nestjs/common';
import { type CreateOrderInput } from 'src/graphql/dto/create-order.input';
import { type CreateOrderItemInput } from 'src/graphql/dto/create_order-item.input';
import { OrderItems } from 'src/graphql/models/order-items.model';
import { Order } from 'src/graphql/models/order.model';
import { Product } from 'src/graphql/models/product.model';

@Injectable()
export class OrdersService {
	async findAll(): Promise<Order[]> {
		const orders = await Order.find({
			relations: {
				orderItems: true,
			},
		});
		console.log('orders: ', orders);

		return orders;
	}

	async findOneById(id: string) {
		const order = await Order.findOne({
			where: { id },
			relations: { orderItems: true },
		});
		console.log('orders: ', order);

		return order;
	}

	async findByOrderId(id: string) {
		const items = await OrderItems.find({
			where: { order: { id } },
			relations: { order: true, product: true },
		});
		// console.log('items: ', items);

		return items;
	}

	async findProductsByOrderItemsId(id: string) {
		const items = await Product.find({
			where: { orderItems: { id } },
			relations: { orderItems: true },
		});
		console.log('items: ', items);

		return items;
	}

	async create(createOrderData: CreateOrderInput) {
		return Order.create({ ...createOrderData }).save();
	}

	async createOrderItem(createOrderItemData: CreateOrderItemInput) {
		const { productId, orderId, quantity } = createOrderItemData;
		return OrderItems.save({
			quantity,
			product: { id: productId },
			order: { id: orderId },
		});
	}
}
