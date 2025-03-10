import { ObjectType, Field } from '@nestjs/graphql';
import { Idea } from '../entities/idea.entity';

@ObjectType()
export class IdeasResponse {
  @Field()
  message?: string;

  @Field()
  idea?: [Idea];
}
