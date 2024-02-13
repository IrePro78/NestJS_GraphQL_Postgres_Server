import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../models/product.model';
import { ProductsService } from '../../products/products.service';

@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductsService,
    // private readonly collectionsService: CollectionsService,
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
    // console.log(mockProduct.find((product) => product.id === id));

    // return mockProduct.find((product) => product.id === id);
    return this.productService.findOneById(id);
  }

  @Mutation(() => Product, {
    name: 'createProduct',
    description: 'Create Product',
    nullable: true,
  })
  async createProduct(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('price') price: number,
    @Args('product_image') product_image: string,
  ): Promise<void> {
    return this.productService.create({
      name,
      description,
      price,
      product_image,
    });
  }
}
