import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ nullable: true })
  username: string;

  @Field({nullable: true})
  password: string;

  @Field({ nullable: true })
  role: string;
}
