import { Injectable } from '@nestjs/common';
import { Category } from '../graphql/models/category.model';

@Injectable()
export class CategoriesService {
	async findAll(
		take: number = 20,
		skip: number = 0,
	): Promise<Category[]> {
		return Category.find({
			take,
			skip,
		});
	}
	async findOneById(id: string) {
		return Category.findOne({
			where: { id },
			relations: { products: true },
		});
	}

	async findOneBySlug(slug: string) {
		return Category.findOne({
			where: { slug },
			relations: { products: true },
		});
	}
	async findByProductId(id: string) {
		return Category.find({
			relations: { products: true },
			where: { products: { id } },
		});
	}
}
