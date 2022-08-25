/* import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'; */

import { User } from './user.entity';
import { Product } from 'src/products/entities/product.entity';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}

/* @Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar' })
  user: User;

  products: Product[];
} */
