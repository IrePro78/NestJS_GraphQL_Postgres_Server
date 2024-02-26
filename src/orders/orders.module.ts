import { Module } from '@nestjs/common';
import { OrdersResolver } from '../graphql/resolvers/order.resolver';
import { OrdersService } from './orders.service';

@Module({
	providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
