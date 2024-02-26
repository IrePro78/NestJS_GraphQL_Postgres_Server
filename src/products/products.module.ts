import { forwardRef, Module } from '@nestjs/common';
import { ProductResolver } from '../graphql/resolvers';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsService } from './products.service';

@Module({
	imports: [forwardRef(() => CategoriesModule)],
	providers: [ProductsService, ProductResolver],
	exports: [ProductsService],
})
export class ProductsModule {}
