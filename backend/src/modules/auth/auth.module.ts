import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oauth2TokensEntity, UserEntity } from './entities/auth.entity';

const entities = [Oauth2TokensEntity, UserEntity]

@Module({
  imports: [
    TypeOrmModule.forFeature([...entities])
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthModule, TypeOrmModule]
})
export class AuthModule {}
