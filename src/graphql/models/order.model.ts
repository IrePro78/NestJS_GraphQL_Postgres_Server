import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItems } from './order-items.model';

enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('orders')
@ObjectType()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Unique identifier of the order' })
  id: string;

  @Column()
  @Field({ description: 'Total amount of the order' })
  total: number;

  @Column('enum', { enum: OrderStatus, default: OrderStatus.PENDING })
  @Field({
    description: 'Status of the order',
  })
  status: string;

  @OneToMany(() => OrderItems, (orderItems) => orderItems)
  orderItems: OrderItems[];
}
