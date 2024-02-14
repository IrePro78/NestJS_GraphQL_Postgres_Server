import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductResolver } from '../graphql/resolvers';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [forwardRef(() => CategoriesModule)],
  providers: [ProductsService, ProductResolver],
  exports: [ProductsService],
})
export class ProductsModule {}
