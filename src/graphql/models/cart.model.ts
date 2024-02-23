import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carts')
@ObjectType()
export class ProductCategorie extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID, { description: 'Unique identifier of the cart' })
	id: string;
}
