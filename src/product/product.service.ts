import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  getAProduct(id: string): Promise<Product> {
    return this.productModel.findOne({
      where: {
        id,
      },
    });
  }

  async createProduct(product): Promise<Product> {
    return this.productModel.create(product);
  }

  updateProduct(id: string, product: Partial<Product>): object {
    const productResponse = this.productModel.update(
      { name: product.name, price: product.price },
      {
        where: {
          id,
        },
      },
    );
    return productResponse;
  }

  async deleteProduct(id: string): Promise<Product> {
    const product = await this.productModel.findOne({
      where: {
        id,
      },
    });
    await product.destroy();
    return product;
  }
}
