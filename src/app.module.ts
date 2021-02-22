import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product/product.model';

@Module({
  imports: [
    ProductModule,
    CartModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'CEvrbg123',
      database: 'cybrilla',
      models: [Product],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
