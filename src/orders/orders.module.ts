import { Module, forwardRef } from '@nestjs/common';
import { OrderItemsResolver } from 'src/graphql/resolvers/order-items.resolver';
import { ProductsModule } from 'src/products/products.module';
import { OrdersResolver } from '../graphql/resolvers/order.resolver';
import { OrdersService } from './orders.service';

@Module({
	imports: [forwardRef(() => ProductsModule)],
	providers: [OrdersService, OrdersResolver, OrderItemsResolver],
})
export class OrdersModule {}
