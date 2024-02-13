import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.model';

@Entity('collections')
@ObjectType()
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Unique identifier of the collection' })
  id: string;

  @Column()
  @Field({ description: 'Name of the collection' })
  name: string;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
