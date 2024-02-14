import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product } from '../models/product.model';
import { ProductsService } from '../../products/products.service';
import { Category } from '../models/categories.model';
import { CategoriesService } from '../../categories/categories.service';
import { CreateProductInput } from '../dto/create-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoriesService,
  ) {} // private readonly collectionsService: CollectionsService, // private readonly

  @Query(() => [Product], {
    name: 'getProducts',
    description: 'Get All Products',
    nullable: true,
  })
  async getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product, {
    name: 'getProduct',
    description: 'Get Product By ID',
    nullable: true,
  })
  async getProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Product> {
    return this.productService.findOneById(id);
  }

  @ResolveField(() => [Category])
  categories(@Parent() product: Product) {
    return this.categoryService.findByProductId(product.id);
  }

  @Mutation(() => Product, {
    name: 'createProduct',
    description: 'Create Product',
    nullable: true,
  })
  async createProduct(
    @Args('createProductData')
    createProductData: CreateProductInput,
    // @Args('categoryId', { type: () => ID }) categoryId: string,
  ): Promise<void> {
    return this.productService.create(createProductData);
  }
}
