import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateIdeaInput } from './dto/create-idea.input';
import { UpdateIdeaInput } from './dto/update-idea.input';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Idea } from './idea.schema';
import { Model } from 'mongoose';

@Injectable()
export class IdeaService {
  constructor(
    private usersService: UserService,
    @InjectModel(Idea.name) private readonly ideaModel: Model<Idea>,
  ) {}

  async create(createIdeaInput: CreateIdeaInput) {
    const createdIdea = new this.ideaModel(createIdeaInput);
    return createdIdea.save();
  }

  findAll() {
    return this.ideaModel.find().exec();
  }
  async findOne(id: Types.ObjectId) {
    const idea = await this.ideaModel.findById(id).exec();
    return idea;
  }

  async update(id: string, updateIdeaInput: UpdateIdeaInput) {
    // Find the idea first to check if it exists
    const existingIdea = await this.ideaModel.findById(id);

    if (!existingIdea) {
      throw new NotFoundException(`Idea with ID ${id} not found`);
    }

    // Update the idea
    const updatedIdea = await this.ideaModel.findByIdAndUpdate(
      id,
      {
        title: updateIdeaInput.title || existingIdea.title,
        description: updateIdeaInput.description || existingIdea.description,
      },
      { new: true }, // Return the updated document
    );

    return updatedIdea;
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    // Find the idea
    const idea = await this.ideaModel.findById(id);

    if (!idea) {
      throw new NotFoundException(`Idea with ID ${id} not found`);
    }

    // Delete the idea
    const result = await this.ideaModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new InternalServerErrorException('Failed to delete idea');
    }

    return true;
  }
}
