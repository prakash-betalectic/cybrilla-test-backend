import {
  Column,
  Model,
  Table,
  ForeignKey,
  PrimaryKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from 'src/product/product.model';

@Table
export class Cart extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: string;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column
  quantity: number;
}
