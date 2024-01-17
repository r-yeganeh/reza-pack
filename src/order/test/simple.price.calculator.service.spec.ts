import {
  SimplePriceCalculator,
  BASE_PACKAGE_PRICE,
  WEIGHT_UNIT_PRICE,
} from '../simple.price.calculator.service';
import { createTestingModule } from './helper';

describe('Simple Price Calculator', () => {
  let priceCalculator: SimplePriceCalculator;

  beforeEach(async () => {
    ({ priceCalculator } = await createTestingModule());
  });

  it('should be defined', () => {
    expect(priceCalculator).toBeDefined();
  });

  describe('calculateTotalPrice', () => {
    it('should add WEIGHT_UNIT_PRICE for every kilogram of weight', () => {
      const item = { length: 10, width: 10, height: 10, weight: 5 };
      const totalPrice = priceCalculator.calculateTotalPrice([item]);
      expect(totalPrice).toBe(
        BASE_PACKAGE_PRICE + item.weight * WEIGHT_UNIT_PRICE,
      );
    });

    it('should add base price for minimal packages', () => {
      const item = { length: 1, width: 1, height: 1, weight: 1 };
      const totalPrice = priceCalculator.calculateTotalPrice([item]);
      expect(totalPrice).toBe(BASE_PACKAGE_PRICE + WEIGHT_UNIT_PRICE);
    });

    it('should ignore volume cost for volumes under FREE_TIER_VOLUME_LIMIT ', () => {
      const item = { length: 49, width: 10, height: 10, weight: 1 };
      const totalPrice = priceCalculator.calculateTotalPrice([item]);
      expect(totalPrice).toBe(BASE_PACKAGE_PRICE + WEIGHT_UNIT_PRICE);
    });

    it(`should add VOLUME_INCREMENT_UNIT_PRICE to the total price for every VOLUME_INCREMENT_STEP increase in volume
      for packages with volume exceeding free tier limit`, () => {
      const item = { length: 50, width: 20, height: 10, weight: 50 };
      const totalPrice = priceCalculator.calculateTotalPrice([item]);
      expect(totalPrice).toBe(
        BASE_PACKAGE_PRICE + 2 * 0.5 + 50 * WEIGHT_UNIT_PRICE,
      );
    });

    it(`should consider floor when dealing with non-round volume increment for packages with volume exceeding free 
      tier limit`, () => {
      const item = { length: 40, width: 20, height: 10, weight: 50 };
      const totalPrice = priceCalculator.calculateTotalPrice([item]);
      expect(totalPrice).toBe(
        BASE_PACKAGE_PRICE +
          Math.floor(8000 / 5000) * 0.5 +
          50 * WEIGHT_UNIT_PRICE,
      );
    });

    it(`should add up package prices correctly to get total price`, () => {
      const packages = [
        { length: 1, width: 1, height: 1, weight: 1 },
        { length: 1, width: 1, height: 1, weight: 2 },
        { length: 1, width: 1, height: 1, weight: 3 },
        { length: 1, width: 1, height: 1, weight: 4 },
      ];
      const totalPrice = priceCalculator.calculateTotalPrice(packages);
      expect(totalPrice).toBe(
        packages.length * BASE_PACKAGE_PRICE + (1 + 2 + 3 + 4) * 0.1,
      );
    });
  });
});
