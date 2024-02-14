import { Injectable } from '@nestjs/common';
import { Category } from '../graphql/models/categories.model';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly productService: ProductsService) {}

  async findByProductId(id: string) {}

  async findAll() {
    return Category.find();
  }
}
