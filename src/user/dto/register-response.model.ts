import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class RegisterResponse {
  @Field()
  message?: string;

  @Field()
  user?: User;
}
