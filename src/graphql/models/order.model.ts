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

	@Column({ type: 'float', default: 0 })
	@Field(() => Float, { description: 'Total amount of the order' })
	totalAmount: number;

	@Column('enum', { enum: OrderStatus, default: OrderStatus.PENDING })
	@Field({
		description: 'Status of the order',
	})
	status: OrderStatus;

	@CreateDateColumn({ type: 'timestamp' })
	@Field({ description: 'Date of the order' })
	createAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	@Field({ description: 'Date of the last update of the order' })
	updateAt: Date;

	@OneToMany(() => OrderItems, (orderItems) => orderItems.order, {
		onDelete: 'CASCADE',
	})
	orderItems?: OrderItems[];
}
