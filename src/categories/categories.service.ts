import { Injectable } from '@nestjs/common';
import { Category } from '../graphql/models/category.model';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CategoriesService {
	constructor(private readonly productService: ProductsService) {}

	async findByProductId(id: string) {
		return Category.find({
			relations: { products: true },
			where: { products: { id } },
		});
	}

	async findOneById(id: string) {
		console.log('id', id);

		const cat = await Category.findOneBy({ id });
		console.log('cat', cat);

		return cat;
	}

	async findAll() {
		return Category.find();
	}
}
