import { Module } from '@nestjs/common';
import { ApiDocumentationController } from './controllers/api-docs.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiDocumentationEntity } from './entities/api-documentation.entity';
import { ApiDocumentationService } from './services/api-docs.service';
import { CommandsDocumentationService } from './services/commands-docs.service';
import { CommandsDocumentationController } from './controllers/commands-docs.controller';

const entities = [ApiDocumentationEntity]
const controllers = [ApiDocumentationController, CommandsDocumentationController]
const services = [ApiDocumentationService, CommandsDocumentationService]

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature(entities)
  ],
  controllers: [...controllers],
  providers: [...services],
})
export class DocumentationModule {}
