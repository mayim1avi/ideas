import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Idea {
  @Prop()
  user: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);
