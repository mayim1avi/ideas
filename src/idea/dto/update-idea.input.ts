import { CreateIdeaInput } from './create-idea.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateIdeaInput extends PartialType(CreateIdeaInput) {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;
}
