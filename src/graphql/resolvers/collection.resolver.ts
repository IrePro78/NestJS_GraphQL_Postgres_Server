import {
	Args,
	ID,
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
		private readonly procuctService: ProductsService,
	) {}

	@Query(() => [Collection], {
		name: 'collections',
		description: 'Get All Collections',
		nullable: true,
	})
	async getCollections(): Promise<Collection[]> {
		return this.collectionService.findAll();
	}
	@ResolveField(() => [Product], {
		name: 'products',
		description: 'Get Products By Collection',
		nullable: true,
	})
	async getProducts(@Parent() collection: Collection) {
		return this.procuctService.findByCollectionId(collection.id);
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
}
