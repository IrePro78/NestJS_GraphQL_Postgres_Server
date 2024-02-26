import { forwardRef, Module } from '@nestjs/common';
import { CategoryResolver } from '../graphql/resolvers';
import { ProductsModule } from '../products/products.module';
import { CategoriesService } from './categories.service';

@Module({
	imports: [forwardRef(() => ProductsModule)],
	providers: [CategoriesService, CategoryResolver],
	exports: [CategoriesService],
})
export class CategoriesModule {}
