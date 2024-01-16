import { Package } from '../schemas/order.schema';

export interface PriceCalculatorInterface {
  calculateTotalPrice(packages: Package[]): number;
}
