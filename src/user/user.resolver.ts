import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ModuleRef } from '@nestjs/core';
import { User } from './entities/user.entity';
import { UserInput } from './dto/user.input';
import { LogoutResponse } from './dto/logout-response.model';
import { BlacklistService } from '../auth/blacklist.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterResponse } from './dto/register-response.model';

@Resolver(() => User)
export class UserResolver {
  private jwtService: JwtService;
  constructor(
    private readonly userService: UserService,
    private moduleRef: ModuleRef,
    private blacklistService: BlacklistService,
  ) {
    this.jwtService = this.moduleRef.get(JwtService, { strict: false });
  }

  @Mutation(() => RegisterResponse)
  async createUser(@Args('createUserInput') createUserInput: UserInput) {
    const user = await this.userService.create(createUserInput);
    delete (user as any).password;
    return { message: 'user created', user: user };
  }

  @Mutation(() => LogoutResponse)
  async logout(@Context() context) {
    const token = context.req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token);
    this.blacklistService.addToBlacklist(decoded.jti);
    return { message: 'Logged out' };
  }
}
