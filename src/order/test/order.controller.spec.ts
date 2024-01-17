import { createTestingModule } from './helper';

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
