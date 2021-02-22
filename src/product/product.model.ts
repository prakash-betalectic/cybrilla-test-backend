import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import { Cart } from 'src/cart/cart.model';

@Table
export class Product extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: string;

  @Column
  name: string;

  @HasMany(() => Cart)
  carts: Cart[];

  @Column
  price: number;
}
