import { Injectable } from '@nestjs/common';
import { Category } from '../graphql/models/category.model';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly productService: ProductsService) {}

  async findByProductId(id: string) {
    const category = await Category.find({
      relations: { products: true },
      where: { products: { id: '7c7bb099-0537-4850-a21e-f3cecde07a6a' } },
    });
    console.log('sssssssssssssssss', category);
    return category;
  }

  async findBytId(id: string) {
    return Category.find({ where: { id } });
  }

  async findAll() {
    return Category.find();
  }
}
