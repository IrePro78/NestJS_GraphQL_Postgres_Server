import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateReviewInput } from 'src/graphql/dto/create-review.input ';
import { Review } from 'src/graphql/models/review.model';
import { ProductsService } from 'src/products/products.service';

@Resolver(() => Review)
export class ReviewResolver {
	constructor(private readonly productService: ProductsService) {}

	@Query(() => [Review], {
		name: 'getProductReviews',
		description: 'Get All Reviews',
		nullable: true,
	})
	async getReviews(
		@Args('productId', { type: () => ID }) productid: string,
	): Promise<Review[]> {
		return this.productService.findReviewsByProductId(productid);
	}

	@Mutation(() => Review, {
		name: 'createProductReview',
		description: 'Create Review',
		nullable: true,
	})
	async createReview(
		@Args('createProductReviewData')
		createReviewData: CreateReviewInput,
	): Promise<Review> {
		console.log('createReviewData', createReviewData);

		return this.productService.createProductReview(createReviewData);
	}
}
