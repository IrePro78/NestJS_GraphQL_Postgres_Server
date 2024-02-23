import { Injectable } from '@nestjs/common';
import { Category } from '../graphql/models/category.model';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CategoriesService {
	constructor(private readonly productService: ProductsService) {}

	async findByProductId(id: string) {
		return await Category.find({
			relations: { products: true },
			where: { products: { id } },
		});
	}

	async findById(id: string) {
		return Category.find({ where: { id } });
	}

	async findAll() {
		return Category.find();
	}
}
