import { Injectable } from '@nestjs/common';
// import { mockProduct } from 'src/_mocks_/products.mocks';
import { Product } from '../graphql/models/product.model';
import { type CreateProductInput } from '../graphql/dto/create-product.input';

@Injectable()
export class ProductsService {
	constructor() {}
	async findOneById(id: string) {
		return Product.findOne({
			where: { id },
			relations: ['categories'],
		});
	}

	async findAll(
		take: number = 20,
		skip: number = 0,
	): Promise<Product[]> {
		return Product.find({
			relations: {
				categories: true,
			},
			take,
			skip,
		});
	}

	async findByCategoryId(id: string) {
		return Product.find({
			where: { categories: { id } },
			relations: {
				categories: true,
			},
		});
	}

	async findByCollectionId(id: string) {
		console.log('id', id);

		return Product.find({
			where: { collections: { id } },
			relations: {
				collections: true,
			},
		});
	}

	// async create(productData: CreateProductInput) {
	// 	for (const prod of mockProduct) {
	// 		const productId = await Product.createQueryBuilder()
	// 			.insert()
	// 			.into(Product)
	// 			.values(prod)
	// 			.execute()
	// 			.then((res) => res.raw[0].id);

	// 		await Product.createQueryBuilder()
	// 			.relation(Product, 'categories')
	// 			.of(productId)
	// 			.add(prod.category_id)
	// 			.then((res) => res);
	// 	}
	// 	return this.findOneById('productId');
	// }

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
