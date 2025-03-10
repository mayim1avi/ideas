import { CreateIdeaInput } from './create-idea.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateIdeaInput extends PartialType(CreateIdeaInput) {
  @Field(() => ID)
  id: string;

  @Field()
  @IsNotEmpty()
  user_email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;
}
