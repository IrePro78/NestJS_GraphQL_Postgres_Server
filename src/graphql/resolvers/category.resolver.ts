import { Query, Resolver } from '@nestjs/graphql';
import { Category } from '../models/categories.model';
import { CategoriesService } from '../../categories/categories.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoriesService) {}

  @Query(() => [Category], {
    name: 'getCategories',
    description: 'Get All Categories',
    nullable: true,
  })
  async getCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
