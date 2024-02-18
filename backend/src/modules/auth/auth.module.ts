import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Oauth2TokensEntity } from './entities/tokens.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

const entities = [Oauth2TokensEntity, UserEntity]

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),

    JwtModule.register({
      secret: process.env.SECRET_KEY || "SECRET KEY",
      signOptions: {
        expiresIn: "48h"
      }
    })
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController, UserController],
  exports: [AuthModule, TypeOrmModule, JwtModule]
})
export class AuthModule {}
