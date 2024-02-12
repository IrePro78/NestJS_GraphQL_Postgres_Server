import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Collection {
  @Field(() => ID)
  id: string;
}
