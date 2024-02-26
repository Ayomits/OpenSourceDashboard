import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryCommandEntity } from './entities/category.entity';
import { CommandEntity } from './entities/command.entity';

const entities = [CategoryCommandEntity, CommandEntity]
const controllers = [CommandsController, CategoryController]
const services = [CommandsService, CategoryService]

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [...controllers],
  providers: [...services],
})
export class CommandsModule {}