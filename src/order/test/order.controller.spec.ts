import { createTestingModule } from './create.testing.module';

describe('OrderController', () => {
  //let controller: OrderController;
  let orderController;

  beforeEach(async () => {
    ({ orderController } = await createTestingModule());
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });
});
