import { Injectable } from '@nestjs/common';
import { type CreateOrderInput } from 'src/graphql/dto/create-order.input';
import { OrderItems } from 'src/graphql/models/order-items.model';
import { Order } from 'src/graphql/models/order.model';

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
			relations: { order: true, product: true },
		});
	}

	async create(createOrderData: CreateOrderInput) {
		return Order.create({ ...createOrderData }).save();
	}
}
