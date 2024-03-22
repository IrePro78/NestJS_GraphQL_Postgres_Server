import { Injectable } from '@nestjs/common';
import {
	type CreateOrderInput,
	type CreateOrderItemInput,
	type UpdateOrderItemInput,
} from 'src/graphql/dto';
import { Order, OrderItems } from 'src/graphql/models';

@Injectable()
export class OrdersService {
	async findAll(): Promise<Order[]> {
		return Order.find({
			relations: {
				orderItems: true,
			},
		});
	}

	async findOneById(id: string) {
		return Order.findOne({
			where: { id },
			relations: { orderItems: true },
		});
	}

	async findByOrderId(id: string) {
		return OrderItems.find({
			where: { order: { id } },
			relations: { product: true },
		});
	}

	async create(createOrderData: CreateOrderInput) {
		return Order.create({ ...createOrderData }).save();
	}

	async createOrderItem(createOrderItemData: CreateOrderItemInput) {
		const { productId, orderId, quantity, total } =
			createOrderItemData;

		return OrderItems.save({
			quantity,
			total,
			product: { id: productId },
			order: { id: orderId },
		});
	}

	async updateOrderItem(updateOrderItemData: UpdateOrderItemInput) {
		const { itemId, quantity } = updateOrderItemData;
		const item = await OrderItems.findOne({
			where: { id: itemId },
			relations: { product: true },
		});
		return OrderItems.save({
			...item,
			quantity,
			total: item.product.price * quantity,
		});
	}

	async removeOrderItem(itemId: string) {
		const item = await OrderItems.delete({ id: itemId });
		console.log('item', item);
		return item.raw[0];
	}
}
