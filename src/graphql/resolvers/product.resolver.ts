import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product } from '../models/product.model';
import { ProductsService } from '../../products/products.service';
import { Category } from '../models/category.model';
import { CategoriesService } from '../../categories/categories.service';
import { CreateProductInput } from '../dto/create-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoriesService,
  ) {} // private readonly collectionsService: CollectionsService, // private readonly

  @Query(() => [Product], {
    name: 'products',
    description: 'Get All Products',
    nullable: true,
  })
  async getProducts(
    @Args('take', { type: () => Int, defaultValue: 20 }) take: number,
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
  ): Promise<Product[]> {
    return this.productService.findAll(take, skip);
  }

  @ResolveField(() => [Category], {
    name: 'categories',
    description: 'Get Categories By Product',
    nullable: true,
  })
  async categories(@Parent() product: Product) {
    return this.categoryService.findByProductId(product.id);
  }

  @Query(() => Product, {
    name: 'product',
    description: 'Get Product By ID',
    nullable: true,
  })
  async getProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Product> {
    return this.productService.findOneById(id);
  }

  @Mutation(() => Product, {
    name: 'createProduct',
    description: 'Create Product',
    nullable: true,
  })
  async createProduct(
    @Args('createProductData')
    createProductData: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(createProductData);
  }
}
