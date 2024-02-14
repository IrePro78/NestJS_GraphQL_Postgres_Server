import { Injectable } from '@nestjs/common';
import { Product } from '../graphql/models/product.model';
import { CreateProductInput } from '../graphql/dto/create-product.input';

@Injectable()
export class ProductsService {
  // constructor(private readonly categoryService: CategoriesService) {}

  async findOneById(id: string) {
    return Product.findOneBy({ id });
  }

  async findAll(): Promise<Product[]> {
    const product = await Product.find();
    console.log(product);
    return product;
  }

  async create(productData: CreateProductInput) {
    const prod = await Product.createQueryBuilder()
      .relation(Product, 'categories')
      .of(productData)
      .add(productData.category_id)
      .then((res) => {
        console.log(res);
        return res;
      });
    return prod;
    // for (const prod of mockProduct) {
    //   await Product.save({ ...prod });
    // console.log(prod);
    // // return prod.save();
    // return Product.save(prod);
  }
}
