import { createTestingModule } from './create.testing.module';

describe('OrderService', () => {
  let orderService;

  beforeEach(async () => {
    ({ orderService } = await createTestingModule());
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });
});
