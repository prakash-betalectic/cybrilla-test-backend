import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { RulesService } from './rules.service';
import { CartController } from './cart.controller';
import { Cart } from './cart.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Cart])],
  providers: [CartService, RulesService],
  controllers: [CartController],
})
export class CartModule {}
