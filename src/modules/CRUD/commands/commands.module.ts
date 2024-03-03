import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { CategoryController } from './controllers/category.controller';
import { CategoryService, CacheCategoriesService } from './services/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryCommandEntity } from './entities/category.entity';
import { CommandEntity } from './entities/command.entity';
import { AuthModule } from 'src/modules/auth/auth.module';

const entities = [CategoryCommandEntity, CommandEntity]
const controllers = [CommandsController, CategoryController]
const services = [CommandsService, CategoryService, CacheCategoriesService]

@Module({
  imports: [
    TypeOrmModule.forFeature(entities), 
    AuthModule
  ],
  controllers: [...controllers],
  providers: [...services],
  exports: [TypeOrmModule, AuthModule]
})
export class CommandsModule {}
