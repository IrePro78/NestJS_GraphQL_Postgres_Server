import { Test, TestingModule } from '@nestjs/testing';
import { OrdersResolver } from '../graphql/resolvers/order.resolver';

describe('OrderResolver', () => {
  let resolver: OrdersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersResolver],
    }).compile();

    resolver = module.get<OrdersResolver>(OrdersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
