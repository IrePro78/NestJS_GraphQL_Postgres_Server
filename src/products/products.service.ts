import { Injectable } from '@nestjs/common';
import { mockProducts } from 'src/_mocks_/products.mocks';
import {
	type CreateProductInput,
	type CreateReviewInput,
} from 'src/graphql/dto';

import { Product, Review } from 'src/graphql/models';

// import { mockProduct } from 'src/_mocks_/products.mocks';
import { ILike } from 'typeorm';

@Injectable()
export class ProductsService {
	async findAll(
		take: number,
		skip: number,
		sort: string,
	): Promise<Product[]> {
		const rating: string = 'desc';

		console.log('take', take, 'skip', skip, 'sort', sort);

		switch (sort) {
			case 'price':
				return Product.find({
					relations: {
						categories: true,
						reviews: true,
					},
					take,
					skip,
					order: {
						price: 'ASC',
					},
				});
			case 'name':
				return Product.find({
					relations: {
						categories: true,
						reviews: true,
					},
					take,
					skip,
					order: {
						name: 'ASC',
					},
				});

			case 'rating':
				return Product.createQueryBuilder('product')
					.leftJoinAndSelect('product.reviews', 'review')
					.select('product.*') // select all product fields
					.addSelect((subQuery) => {
						return subQuery
							.select('COALESCE(AVG(review.rating), 0)', 'rating')
							.from(Review, 'review')
							.where('review.product = product.id');
					}, 'rating')
					.groupBy('product.id')
					.orderBy('rating', rating === 'asc' ? 'ASC' : 'DESC')
					.limit(take)
					.offset(skip)
					.getRawMany();

			default:
				return Product.find({
					relations: {
						categories: true,
						reviews: true,
					},
					take,
					skip,
					order: {
						id: Math.random() < 0.5 ? 'DESC' : 'ASC',
					},
				});
		}
	}

	async findOneById(id: string) {
		return Product.findOne({
			where: { id },
			relations: {
				categories: true,
				collections: true,
				reviews: true,
			},
		});
	}

	async findAllByName(name: string, take: number, skip: number) {
		return Product.find({
			where: { name: ILike(`%${name}%`) },
			relations: {
				collections: true,
				categories: true,
				reviews: true,
			},
			take,
			skip,
			order: {
				name: 'ASC',
				id: 'DESC',
			},
		});
	}

	async findByCategoryId(id: string, take: number, skip: number) {
		return Product.find({
			where: { categories: { id } },
			relations: {
				categories: true,
				collections: true,
				reviews: true,
			},
			take,
			skip,
			order: {
				price: 'ASC',
			},
		});
	}

	async findByCollectionId(id: string, take: number, skip: number) {
		return Product.find({
			where: { collections: { id } },
			relations: {
				collections: true,
				categories: true,
				reviews: true,
			},
			take,
			skip,
			order: {
				price: 'ASC',
			},
		});
	}

	async findProductByOrderItemsId(id: string) {
		const products = await Product.find({
			where: { orderItems: { id } },
			relations: { orderItems: true },
		});

		return products;
	}

	async findReviewsByProductId(id: string) {
		return Review.find({
			where: { product: { id } },
		});
	}

	async createProductReview(reviewData: CreateReviewInput) {
		const { productId, headline, content, name, email, rating } =
			reviewData;

		const review = await Review.save({
			headline,
			content,
			name,
			email,
			rating,
			product: { id: productId },
		});

		console.log('review', review);

		return review;
	}

	// async create(productData: CreateProductInput) {
	// 	for (const prod of mockProducts) {
	// 		const productId = await Product.createQueryBuilder()
	// 			.insert()
	// 			.into(Product)
	// 			.values(prod)
	// 			.execute()
	// 			.then((res) => res.raw[0].id);

	// 		await Product.createQueryBuilder()
	// 			.relation(Product, 'categories')
	// 			.of(productId)
	// 			.add('70dc8ded-3407-4baa-92c7-3a9ae3501c11')
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
