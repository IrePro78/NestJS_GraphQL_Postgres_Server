import { Module } from '@nestjs/common';
import { CartResolver } from '../graphql/resolvers/cart.resolver';

@Module({
	providers: [CartResolver],
})
export class CartsModule {}
