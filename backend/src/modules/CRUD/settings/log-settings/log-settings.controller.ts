import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { LogSettingsService } from "./log-settings.service";
import { CreateLogSettingDto } from "./dto/create-log-setting.dto";
import { IsYourServer } from "src/modules/auth/guards/isYourServer.guard";
import { ApiTags } from "@nestjs/swagger";

// Working with LogSettingsService

@Controller("log-settings")
@ApiTags(`log-settings`)
export class LogSettingsController {
  constructor(private readonly logSettingsService: LogSettingsService) {}

  @Post(`create`) // This method Create Or Update guild log-settings in DB
  @UseGuards(IsYourServer)
  createOrUpdate(@Body() createLogSettingDto: CreateLogSettingDto) {
    return this.logSettingsService.createOrUpdate(createLogSettingDto);
  }

  @Get(":guildId/all")
  find(@Param("guildId") guildId: string) {
    return this.logSettingsService.findOne(guildId);
  }

  @Delete(":guildId")
  @UseGuards(IsYourServer)
  remove(@Param("guildId") guildID: string) {
    return this.logSettingsService.remove(guildID);
  }
}
