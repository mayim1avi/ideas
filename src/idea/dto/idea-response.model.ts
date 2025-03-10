import { ObjectType, Field } from '@nestjs/graphql';
import { Idea } from '../entities/idea.entity';

@ObjectType()
export class IdeaResponse {
  @Field()
  message?: string;

  @Field({ nullable: true })
  idea?: Idea;
}
