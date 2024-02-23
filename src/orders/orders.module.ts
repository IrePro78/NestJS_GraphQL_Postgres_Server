import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from '../graphql/resolvers/order.resolver';

@Module({
  providers: [OrdersService, OrdersResolver]
})
export class OrdersModule {}
