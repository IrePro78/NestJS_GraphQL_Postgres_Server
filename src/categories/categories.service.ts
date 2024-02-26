import { Injectable } from '@nestjs/common';
import { Category } from '../graphql/models/category.model';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CategoriesService {
	constructor(private readonly productService: ProductsService) {}

	async findAll() {
		return Category.find();
	}

	async findByProductId(id: string) {
		return Category.find({
			relations: { products: true },
			where: { products: { id } },
		});
	}

	async findOneById(id: string) {
		return Category.findOne({
			where: { id },
			relations: { products: true },
		});
	}
}
