import {
	Args,
	ID,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from '@nestjs/graphql';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/graphql/models/category.model';
import { Product } from 'src/graphql/models/product.model';
import { ProductsService } from 'src/products/products.service';

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
	@ResolveField(() => [Product], {
		name: 'products',
		description: 'Get Products By Category',
		nullable: true,
	})
	async getProducts(@Parent() category: Category) {
		return this.productService.findByCategoryId(category.id);
	}

	@Query(() => Category, {
		name: 'category',
		description: 'Get Category By ID',
		nullable: true,
	})
	async getCategoryById(
		@Args('id', { type: () => ID }) id: string,
	): Promise<Category> {
		return this.categoryService.findOneById(id);
	}
}
