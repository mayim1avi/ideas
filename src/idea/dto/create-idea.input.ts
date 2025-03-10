import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class CreateIdeaInput {
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
