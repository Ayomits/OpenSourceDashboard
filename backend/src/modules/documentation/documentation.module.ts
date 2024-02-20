import { Module } from "@nestjs/common";
import { ApiDocumentationController } from "./controllers/api/api-docs.controller";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiDocumentationEntity } from "./entities/documentation/api-documentation.entity";
import { ApiDocumentationService } from "./services/api-docs.service";
import { CommandsDocumentationService } from "./services/commands-docs.service";
import { CommandsDocumentationController } from "./controllers/commands/commands-docs.controller";
import { CommandsCategoryController } from "./controllers/commands/commands-category-docs.controller";
import { ApiCategoryController } from "./controllers/api/api-category-docs.controller";
import { ApiCategoryEntity } from "./entities/category/api-category.entity";
import { CommandsCategoryEntity } from "./entities/category/commands-category.entity";
import { CommandsDocumentationEntity } from "./entities/documentation/commands-documentation.entity";

const entities = [
  ApiDocumentationEntity,
  ApiCategoryEntity,
  CommandsCategoryEntity,
  CommandsDocumentationEntity,
];
const controllers = [
  ApiDocumentationController,
  ApiCategoryController,
  CommandsDocumentationController,
  CommandsCategoryController,
];
const services = [ApiDocumentationService, CommandsDocumentationService];

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature(entities)],
  controllers: [...controllers],
  providers: [...services],
})
export class DocumentationModule {}
