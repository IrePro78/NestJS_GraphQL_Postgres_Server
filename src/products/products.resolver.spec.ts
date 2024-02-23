import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from '../graphql/resolvers/product.resolver';

describe('ProductsResolver', () => {
	let resolver: ProductResolver;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProductResolver],
		}).compile();

		resolver = module.get<ProductResolver>(ProductResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
