import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ nullable: true })
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  role: string;

  @Field()
  password: string;
}
