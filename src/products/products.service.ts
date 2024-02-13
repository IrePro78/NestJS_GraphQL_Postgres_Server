import { Injectable } from '@nestjs/common';
import { Product } from '../graphql/models/product.model';
import { CreateProductInput } from '../graphql/dto/create-product.input';
import { mockProduct } from '../_mocks_/products.mocks';

@Injectable()
export class ProductsService {
  async findOneById(id: string) {
    return Product.findOneBy({ id });
  }

  async findAll(): Promise<Product[]> {
    const product = await Product.find();
    console.log(product);
    return product;
  }

  async create(data: CreateProductInput) {
    for (const prod of mockProduct) {
      await Product.save({ ...prod });
      // console.log(prod);
      // // return prod.save();
      // return Product.save(prod);
    }
  }
}

// private async seedProduct() {
//   // await Product.save({
//   //   name: 'Product 1',
//   //   description: 'This is product 1',
//   //   price: 100,
//   //   product_image: 'http://example.com/product1.jpg',
//   // });
//   for (const prod of mockProduct) {
// console.log(prod);
// const product = new Product();
// product.name = prod.name;
// product.description = prod.description;
// product.price = prod.price;
// product.product_image = prod.product_image;
// product.collections = [];
// product.categories = [];
// product.orderItems = [];
// console.log(product);
// await product.save();
// await Product.save({ ...prod });
// }
// }
// }
