import { Injectable } from '@nestjs/common';
import { Collection } from 'src/graphql/models/collection.model';

@Injectable()
export class CollectionsService {
	// constructor(private readonly productsService: ProductsService) {}

	async findAll() {
		return Collection.find();
	}

	async findByProductId(id: string) {
		return Collection.find({
			relations: { products: true },
			where: { products: { id } },
		});
	}

	async findOneById(id: string) {
		return Collection.findOne({
			where: { id },
			relations: { products: true },
		});
	}
}
