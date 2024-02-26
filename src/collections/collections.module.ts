import { Module } from '@nestjs/common';
import { CollectionResolver } from '../graphql/resolvers/collection.resolver';
import { CollectionsService } from './collections.service';

@Module({
	providers: [CollectionsService, CollectionResolver],
})
export class CollectionsModule {}
