import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductResolver } from '../graphql/resolvers/product.resolver';

@Module({
  providers: [ProductsService, ProductResolver],
})
export class ProductsModule {}
