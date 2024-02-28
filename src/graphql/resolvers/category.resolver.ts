import {
	Args,
	ID,
	Int,
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
	async getCategories(
		@Args('take', { type: () => Int, defaultValue: 20 }) take: number,
		@Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
	): Promise<Category[]> {
		return this.categoryService.findAll(take, skip);
	}
	@ResolveField(() => [Product], {
		name: 'products',
		description: 'Get Products By Category',
		nullable: true,
	})
	async getProducts(
		@Parent() category: Category,
		@Args('take', { type: () => Int, defaultValue: 20 }) take: number,
		@Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
	): Promise<Product[]> {
		return this.productService.findByCategoryId(
			category.id,
			take,
			skip,
		);
	}

	@Query(() => Category, {
		name: 'categoryById',
		description: 'Get Category By ID',
		nullable: true,
	})
	async getCategoryById(
		@Args('id', { type: () => ID }) id: string,
	): Promise<Category> {
		return this.categoryService.findOneById(id);
	}

	@Query(() => Category, {
		name: 'categoryBySlug',
		description: 'Get Category By Slug',
		nullable: true,
	})
	async getCategoryBySlug(
		@Args('slug', { type: () => String }) slug: string,
	): Promise<Category> {
		return this.categoryService.findOneBySlug(slug);
	}
}
