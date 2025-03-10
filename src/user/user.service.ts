import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInput } from './dto/user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async create(createUserInput: UserInput) {
    const existingUser = await this.findByUsername(createUserInput.username);
    if (existingUser) {
      throw new UnauthorizedException('User with this username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    // Create user
    const newUser = {
      password: hashedPassword,
      role: createUserInput.role || 'user',
      username: createUserInput.username,
    };

    const createdUser = new this.UserModel(newUser);
    return createdUser.save();
  }


  async findByUsername(username: string): Promise<User | null> {
    const user = await this.UserModel.findOne({ username: username }).exec();
    return user;
  }
}
