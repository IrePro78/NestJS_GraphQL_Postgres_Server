import {
	Args,
	ID,
	Int,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from '@nestjs/graphql';
import { CollectionsService } from 'src/collections/collections.service';
import { Collection } from 'src/graphql/models/collection.model';
import { Product } from 'src/graphql/models/product.model';
import { ProductsService } from 'src/products/products.service';

@Resolver(() => Collection)
export class CollectionResolver {
	constructor(
		private readonly collectionService: CollectionsService,
		private readonly productService: ProductsService,
	) {}

	@Query(() => [Collection], {
		name: 'collections',
		description: 'Get All Collections',
		nullable: true,
	})
	async getCollections(
		@Args('take', { type: () => Int, defaultValue: 20 }) take: number,
		@Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
	): Promise<Collection[]> {
		return this.collectionService.findAll(take, skip);
	}
	@ResolveField(() => [Product], {
		name: 'products',
		description: 'Get Products By Collection',
		nullable: true,
	})
	async getProducts(
		@Parent() collection: Collection,
		@Args('take', { type: () => Int, defaultValue: 30 }) take: number,
		@Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
	): Promise<Product[]> {
		return this.productService.findByCollectionId(
			collection.id,
			take,
			skip,
		);
	}

	@Query(() => Collection, {
		name: 'collection',
		description: 'Get Collection By ID',
		nullable: true,
	})
	async getCollectionById(
		@Args('id', { type: () => ID }) id: string,
	): Promise<Collection> {
		return this.collectionService.findOneById(id);
	}

	@Query(() => Collection, {
		name: 'collectionBySlug',
		description: 'Get Collection By Slug',
		nullable: true,
	})
	async getCollectionBySlug(
		@Args('slug', { type: () => String }) slug: string,
	): Promise<Collection> {
		return this.collectionService.findOneBySlug(slug);
	}
}
