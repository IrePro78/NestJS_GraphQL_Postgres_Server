import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from 'src/types/order';
import { OrderItems } from './order-items.model';

@Entity('orders')
@ObjectType()
export class Order extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID, { description: 'Unique identifier of the order' })
	id: string;

	@Column({ type: 'float', default: 0 })
	@Field(() => Float, { description: 'Total amount of the order' })
	totalAmount: number;

	@Column('enum', { enum: OrderStatus, default: OrderStatus.DRAFT })
	@Field({
		description: 'Status of the order',
	})
	status: string;

	@CreateDateColumn({ type: 'timestamp' })
	@Field(() => Date, { description: 'Date of the order' })
	createAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	@Field(() => Date, {
		description: 'Date of the last update of the order',
	})
	updateAt: Date;

	@OneToMany(() => OrderItems, (orderItems) => orderItems.order, {
		onDelete: 'CASCADE',
	})
	orderItems?: OrderItems[];
}
