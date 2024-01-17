import { Injectable } from '@nestjs/common';
import { PriceCalculatorInterface } from './interface/PriceCalculatorInterface';
import { Package } from './schemas/order.schema';

export const FREE_TIER_VOLUME_LIMIT = 5000;
export const VOLUME_INCREMENT_STEP = 5000;
export const BASE_PACKAGE_PRICE = 1;
export const VOLUME_INCREMENT_UNIT_PRICE = 0.5;
export const WEIGHT_UNIT_PRICE = 0.1;

@Injectable()
export class SimplePriceCalculator implements PriceCalculatorInterface {
  calculateTotalPrice(packages: Package[]): number {
    let totalPrice = 0;
    for (const item of packages) {
      const { length, width, height, weight } = item;
      const volume = length * width * height;
      console.log('volume: ', volume);
      const extraVolumeCost =
        volume < FREE_TIER_VOLUME_LIMIT
          ? 0
          : Math.floor(volume / VOLUME_INCREMENT_STEP) * VOLUME_INCREMENT_UNIT_PRICE;
      console.log('extraVolumeCost: ', extraVolumeCost);
      const weightCost = weight * WEIGHT_UNIT_PRICE;
      console.log('weightCost: ', weightCost);
      const packagePrice = BASE_PACKAGE_PRICE + extraVolumeCost + weightCost;
      console.log('packagePrice: ', packagePrice, '\n......................');
      totalPrice += packagePrice;
    }
    console.log('totalPrice: ', totalPrice);

    return totalPrice;
  }
}
