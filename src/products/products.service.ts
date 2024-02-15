import { Injectable } from '@nestjs/common';
import { Product } from '../graphql/models/product.model';
import { CreateProductInput } from '../graphql/dto/create-product.input';

@Injectable()
export class ProductsService {
  async findOneById(id: string) {
    const product = await Product.findOne({
      where: { id },
      relations: ['categories'],
    });
    console.log(product);
    return product;
  }

  async findAll(): Promise<Product[]> {
    return await Product.find({
      relations: {
        categories: true,
      },
    });
  }

  async findByCategoryId(id: string) {
    return Product.find({
      where: { categories: { id } },
      relations: ['categories'],
    });
  }

  async create(productData: CreateProductInput) {
    const productId = await Product.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productData)
      .execute()
      .then((res) => res.raw[0].id);
    await Product.createQueryBuilder()
      .relation(Product, 'categories')
      .of(productId)
      .add(productData.category_id)
      .then((res) => res);
    return this.findOneById(productId);
  }
}
