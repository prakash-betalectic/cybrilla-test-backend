import { Controller, Get, Post, Body } from '@nestjs/common';
import { CartDto } from './cart.dto';
import { Cart } from './cart.model';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCartData(): Promise<object> {
    return this.cartService.getCartData();
  }

  @Post()
  addItem(@Body() cartDto: CartDto) {
    return this.cartService.addItem(cartDto);
  }
}
