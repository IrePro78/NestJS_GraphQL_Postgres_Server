import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CollectionsService {
	// constructor(private readonly productsService: ProductsService) {}
	async findOneById(id: string) {
		return `This action returns a #${id} collection`;
	}

	async findAll() {
		return `This action returns all collections`;
	}
}
