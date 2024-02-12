import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionResolver } from '../graphql/resolvers/collection.resolver';

@Module({
  providers: [CollectionsService, CollectionResolver],
})
export class CollectionsModule {}
