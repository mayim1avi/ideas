import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ModuleRef } from '@nestjs/core';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthService } from '../auth/auth.service';
import { LogoutResponse } from './dto/logout-response.model';
import { BlacklistService } from '../auth/blacklist.service';
import { JwtService } from '@nestjs/jwt';

@Resolver(() => User)
export class UserResolver {
  private jwtService: JwtService;
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,    
    private moduleRef: ModuleRef,
    private blacklistService: BlacklistService,  
  ) {
    this.jwtService = this.moduleRef.get(JwtService, { strict: false });
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = this.userService.create(createUserInput);
    return user;
  }

  @Query(() => [User])
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @Mutation(() => LogoutResponse)
  async logout(@Context() context) {
    const token = context.req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token);
    this.blacklistService.addToBlacklist(decoded.jti);
    return { message: 'Logged out' };
  }
}
