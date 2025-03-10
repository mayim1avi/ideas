import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.schema';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import {BlacklistService} from "./blacklist.service";
@Module({
  imports: [
    JwtModule.register({
      secret: 'your_jwt_secret', // Configure your secret key (could also use an environment variable)
      signOptions: { expiresIn: '24h' }, // Optional: set default expiration time for tokens
    }),
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, BlacklistService],
  exports: [AuthService, BlacklistService],
})
export class AuthModule {}
