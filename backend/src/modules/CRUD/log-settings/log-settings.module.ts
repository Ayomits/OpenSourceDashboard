import { Module } from "@nestjs/common";
import { LogSettingsService } from "./log-settings.service";
import { LogSettingsController } from "./log-settings.controller";
import { AuthModule } from "src/modules/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogSettingEntity } from "./entities/log-setting.entity";
import { UserService } from "src/modules/auth/services/user.service";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([LogSettingEntity])],
  controllers: [LogSettingsController],
  providers: [LogSettingsService],
})
export class LogSettingsModule {}
