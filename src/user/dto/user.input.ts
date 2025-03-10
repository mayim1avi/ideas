import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  role: string;
}
