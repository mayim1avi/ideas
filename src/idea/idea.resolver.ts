import {Resolver, Query, Mutation, Args, Int, ID} from '@nestjs/graphql';
import { IdeaService } from './idea.service';
import { Idea } from './entities/idea.entity';
import { CreateIdeaInput } from './dto/create-idea.input';
import { UpdateIdeaInput } from './dto/update-idea.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { IdeaResponse } from './dto/idea-response.model';
import {Types} from "mongoose";

@UseGuards(GqlAuthGuard)
@Resolver(() => Idea)
export class IdeaResolver {
  constructor(private readonly ideaService: IdeaService) {}

  @Mutation(() => IdeaResponse)
  async createIdea(@Args('createIdeaInput') createIdeaInput: CreateIdeaInput) {
    const idea = await this.ideaService.create(createIdeaInput);
    return { message: 'idea created', idea: idea };
  }

  @Query(() => [Idea], { name: 'ideas' })
  findAll() {
    return this.ideaService.findAll();
  }

  @Query(() => Idea, { name: 'idea' })
  findOne(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.ideaService.findOne(id);
  }

  @Mutation(() => Idea)
  updateIdea(@Args('updateIdeaInput') updateIdeaInput: UpdateIdeaInput) {
    return this.ideaService.update(updateIdeaInput.id, updateIdeaInput);
  }

  @Mutation(() => IdeaResponse)
  async removeIdea(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    const result = await this.ideaService.remove(id);
    if (result) {
      return { message: 'Idea deleted' };
    } else {
      return { message: 'something went wrong' };
    }
  }
}
