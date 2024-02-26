import {
	Parent,
	Query,
	ResolveField,
	Resolver,
} from '@nestjs/graphql';
import { Category } from '../models/category.model';
import { CategoriesService } from '../../categories/categories.service';
import { Product } from '../models/product.model';
import { ProductsService } from '../../products/products.service';

@Resolver(() => Category)
export class CategoryResolver {
	constructor(
		private readonly categoryService: CategoriesService,
		private readonly productService: ProductsService,
	) {}

	@Query(() => [Category], {
		name: 'getCategories',
		description: 'Get All Categories',
		nullable: true,
	})
	async getCategories(): Promise<Category[]> {
		return this.categoryService.findAll();
	}
	@ResolveField(() => [Product], {
		name: 'products',
		description: 'Get Products By Category',
		nullable: true,
	})
	products(@Parent() category: Category) {
		return this.productService.findByCategoryId(category.id);
	}
}
