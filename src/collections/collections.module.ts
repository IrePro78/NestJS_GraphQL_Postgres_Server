import { Module, forwardRef } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { CollectionResolver } from '../graphql/resolvers/collection.resolver';
import { CollectionsService } from './collections.service';

@Module({
	imports: [forwardRef(() => ProductsModule)],
	providers: [CollectionsService, CollectionResolver],
	exports: [CollectionsService],
})
export class CollectionsModule {}
