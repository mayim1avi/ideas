import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true
})
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  role: string;

  @Prop()
  password: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
