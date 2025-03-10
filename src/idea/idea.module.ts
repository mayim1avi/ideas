import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaResolver } from './idea.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeaSchema, Idea } from './idea.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
  ],
  providers: [IdeaResolver, IdeaService],
})
export class IdeaModule {}
