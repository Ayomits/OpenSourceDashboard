import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Oauth2TokensEntity } from './entities/tokens.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { IsAuth } from './guards/isAuth.guard';
import { IsYourServer } from './guards/isYourServer.guard';
import { UsersController } from './controllers/user.controller';
import { IsAdmin } from './guards/isAdmin.guard';
import { TokensService } from './services/tokens.service';

const entities = [Oauth2TokensEntity, UserEntity]
const guards = [IsAuth, IsYourServer, IsAdmin]
const services = [AuthService, UserService, TokensService]
const controllers = [AuthController, UsersController]


@Module({
  imports: [
    TypeOrmModule.forFeature(entities),

    JwtModule.register({
      secret: process.env.SECRET_KEY || "SECRET KEY",
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  providers: [...guards, ...services],
  controllers: [...controllers],
  exports: [AuthModule, TypeOrmModule, JwtModule, ...services]
})
export class AuthModule {}
