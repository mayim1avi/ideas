import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './entities/login-response.model';
import {UnauthorizedException} from "@nestjs/common";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const validateUser = await this.authService.validateUser(username, password);
    const token = await this.authService.login(validateUser); // Login user
    return { token: token };
  }
}
