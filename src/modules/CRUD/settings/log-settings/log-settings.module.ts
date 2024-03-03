import { Module } from "@nestjs/common";
import { LogSettingsService } from "./log-settings.service";
import { LogSettingsController } from "./log-settings.controller";
import { AuthModule } from "src/modules/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogSettingEntity } from "./entities/log-setting.entity";

const entities = [LogSettingEntity]
const services = [LogSettingsService]
const controllers = [LogSettingsController]

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature(entities)],
  controllers: [...controllers],
  providers: [...services],
  exports: [TypeOrmModule]
})
export class LogSettingsModule {}
