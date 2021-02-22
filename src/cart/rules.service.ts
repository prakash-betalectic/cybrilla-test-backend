import { Injectable } from '@nestjs/common';

@Injectable()
export class RulesService {
  processCartData(cartResponse: any) {
    let records = {};
    let totalPrice = 0,
      totalDiscount = 0;

    records['items'] = cartResponse.map((c) => {
      const discount = this.calculateDiscount(
        c.product.name,
        c.product.price,
        c.quantity,
      );

      totalPrice += c.product.price * c.quantity;
      totalDiscount += discount;

      return {
        productId: c.productId,
        item: c.product.name,
        quantity: c.quantity,
        price: c.product.price,
        discount,
      };
    });

    totalDiscount = this.finalDiscount(totalPrice, totalDiscount);

    records['totalPrice'] = totalPrice;
    records['totalDiscount'] = totalDiscount;
    records['totalAfterDiscount'] = totalPrice - totalDiscount;
    return records;
  }

  calculateDiscount(item: string, price: number, quantity: number): number {
    let discount = 0;
    if (item === 'A') {
      discount = Math.floor(quantity / 3) * 15;
    } else if (item === 'B') {
      discount = Math.floor(quantity / 2) * 5;
    }
    return discount;
  }

  finalDiscount(totalPrice: number, totalDiscount: number): number {
    return totalPrice - totalDiscount > 150
      ? totalDiscount + 20
      : totalDiscount;
  }
}
