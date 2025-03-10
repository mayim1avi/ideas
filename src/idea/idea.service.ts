import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const user = await this.usersService.findByEmail(
      createIdeaInput.user_email,
    );
    if (!user) {
      throw new UnauthorizedException('Access Denied');
    }
    const user_id = user['_id'].toString();
    const newIdea = {
      user: user_id,
      title: createIdeaInput.title,
      description: createIdeaInput.title,
    };

    console.log('newIdea', newIdea);

    const createdIdea = new this.ideaModel(newIdea);
    return createdIdea.save();
  }

  findAll() {
    return this.ideaModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} idea`;
  }

  update(id: string, updateIdeaInput: UpdateIdeaInput) {
    return `This action updates a #${id} idea`;
  }

  remove(id: number) {
    return `This action removes a #${id} idea`;
  }
}
