import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.model';

@Entity('categories')
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Unique identifier of the category' })
  id: string;
  @Column()
  @Field({ description: 'Name of the category' })
  name: string;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
