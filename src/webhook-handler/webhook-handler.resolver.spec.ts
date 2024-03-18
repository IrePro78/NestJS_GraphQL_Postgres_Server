import { Test, type TestingModule } from '@nestjs/testing';
import { WebhookHandlerResolver } from '../graphql/resolvers/webhook-handler.resolver';

describe('WebhookHandlerResolver', () => {
	let resolver: WebhookHandlerResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [WebhookHandlerResolver],
		}).compile();

		resolver = module.get<WebhookHandlerResolver>(
			WebhookHandlerResolver,
		);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
