import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { Product } from '../models/product.model';
import { ProductsService } from '../../products/products.service';
import { CollectionsService } from '../../collections/collections.service';
import { mockProduct } from '../../_mocks_/products.mocks';

@Resolver('Product')
export class ProductResolver {
  constructor() {} // private readonly collectionsService: CollectionsService, // private readonly productService: ProductsService,

  @Query(() => [Product], {
    name: 'getProducts',
    description: 'Get All Products',
    nullable: true,
  })
  async getProducts(): Promise<Product[]> {
    console.log(mockProduct);
    return mockProduct;
    // return this.productService.findAll();
  }

  @Query(() => Product, {
    name: 'getProduct',
    description: 'Get Product By ID',
    nullable: true,
  })
  async getProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Product> {
    console.log(mockProduct.find((product) => product.id === id));

    return mockProduct.find((product) => product.id === id);
    // return this.productService.findOneById(id);
  }
}
