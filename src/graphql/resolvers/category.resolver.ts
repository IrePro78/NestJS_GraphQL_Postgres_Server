import {
	Args,
	ID,
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
		name: 'categories',
		description: 'Get All Categories',
		nullable: true,
	})
	async getCategories(): Promise<Category[]> {
		return this.categoryService.findAll();
	}
	// @ResolveField(() => [Product], {
	// 	name: 'products',
	// 	description: 'Get Products By Category',
	// 	nullable: true,
	// })
	@Query(() => [Category], {
		name: 'category',
		description: 'Get Category By ID',
		nullable: true,
	})
	async getCategoryById(
		@Args('id', { type: () => ID }) id: string,
	): Promise<Category> {
		return this.categoryService.findOneById(id);
	}

	// async productsFromCategory(@Parent() category: Category) {
	// 	return this.productService.findByCategoryId(category.id);
	// }
}
