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
    const products = await Product.find({
      relations: {
        categories: true,
      },
    });
    console.log(products);

    return { ...products };
  }

  async create(productData: CreateProductInput) {
    const product = await Product.createQueryBuilder()
      .insert()
      .values(productData)
      .execute();
    await Product.createQueryBuilder()
      .relation(Product, 'categories')
      .of(product.identifiers[0].id)
      .add(productData.category_id);

    return 'prod';
    // for (const prod of mockProduct) {
    //   await Product.save({ ...prod });
    // console.log(prod);
    // // return prod.save();
    // return Product.save(prod);
  }
}
