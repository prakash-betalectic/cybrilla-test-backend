import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/product/product.model';
import { Cart } from './cart.model';
import { RulesService } from './rules.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart,
    private readonly rulesService: RulesService,
  ) {}

  async getCartData(): Promise<object> {
    const cartResponse = await this.cartModel.findAll({ include: Product });

    const cartData = this.rulesService.processCartData(cartResponse);
    return cartData;
  }

  async getSingleCart(productId: string): Promise<Cart> {
    return this.cartModel.findOne({
      where: {
        productId,
      },
    });
  }

  async addItem(cart): Promise<any> {
    if (!cart.quantity) {
      cart.quantity = 1;
    }
    const record = await this.getSingleCart(cart.productId);
    if (record === null) {
      return this.cartModel.create(cart);
    } else {
      const _quantity = cart.quantity + record.quantity;
      const productResponse = this.cartModel.update(
        { productId: cart.productId, quantity: _quantity },
        {
          where: {
            productId: cart.productId,
          },
        },
      );
      return productResponse;
    }
  }
}
