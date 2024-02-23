import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryResolver } from '../graphql/resolvers';
import { ProductsModule } from '../products/products.module';

@Module({
	imports: [forwardRef(() => ProductsModule)],
	providers: [CategoriesService, CategoryResolver],
	exports: [CategoriesService],
})
export class CategoriesModule {}
