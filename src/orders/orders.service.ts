import { Injectable } from '@nestjs/common';
import {
	type CreateOrderInput,
	type CreateOrderItemInput,
	type UpdateOrderItemInput,
} from 'src/graphql/dto';
import { Order, OrderItems } from 'src/graphql/models';
import { type OrderStatus } from 'src/types/order';

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
		return Order.save({ ...createOrderData });
	}

	async createOrderItem(createOrderItemData: CreateOrderItemInput) {
		const { productId, orderId, quantity, total } =
			createOrderItemData;

		const orderItems = await OrderItems.save({
			quantity,
			total,
			product: { id: productId },
			order: { id: orderId },
		});

		await this.updateTotalOrderAmount(orderId);

		return orderItems;
	}

	async updateOrderItem(updateOrderItemData: UpdateOrderItemInput) {
		const { itemId, quantity } = updateOrderItemData;
		const item = await OrderItems.findOne({
			where: { id: itemId },
			relations: { product: true, order: true },
		});

		const updatedItem = await OrderItems.save({
			...item,
			quantity,
			total: item.product.price * quantity,
		});

		await this.updateTotalOrderAmount(item.order.id);
		return updatedItem;
	}

	async removeOrderItem(itemId: string) {
		const item = await OrderItems.findOne({
			where: { id: itemId },
			relations: { order: true },
		});

		await OrderItems.delete({ id: itemId });

		if (!item) {
			throw new Error('Order item not found');
		}
		await this.updateTotalOrderAmount(item.order.id);
	}

	private async updateTotalOrderAmount(orderId: string) {
		const orderItems = await OrderItems.find({
			where: { order: { id: orderId } },
			relations: { product: true },
		});
		const totalAmount = orderItems.reduce(
			(acc, item) => acc + item.total,
			0,
		);
		return Order.update(orderId, { totalAmount });
	}

	private async updateOrderStatus(
		orderId: string,
		status: OrderStatus,
	) {
		return Order.update(orderId, { status });
	}
}
