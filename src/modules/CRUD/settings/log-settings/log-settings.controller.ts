import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { LogSettingsService } from "./log-settings.service";
import { CreateLogSettingDto } from "./dto/create-log-setting.dto";
import { IsYourServer } from "src/modules/auth/guards/isYourServer.guard";
import { ApiTags } from "@nestjs/swagger";
import { CacheKey } from "@nestjs/cache-manager";
import { IsAuth } from "src/modules/auth/guards/isAuth.guard";
import { UpdateLogSettingDto } from "./dto/update-log-setting.dto";

// Working with LogSettingsService

@Controller("log-settings")
@ApiTags(`log-settings`)
export class LogSettingsController {
  constructor(private readonly logSettingsService: LogSettingsService) {}

  @Post(`create`) // This method Create Or Update guild log-settings in DB
  @UseGuards(IsYourServer)
  create(@Body() createLogSettingDto: CreateLogSettingDto) {
    return this.logSettingsService.create(createLogSettingDto);
  }

  @Get(":guildId/all")
  find(@Param("guildId") guildId: string) {
    return this.logSettingsService.findOne(guildId);
  }

  @Patch(`:guildId/update`)
  @UseGuards(IsYourServer)
  update(@Param("guildId") guildId: string, @Body() dto: CreateLogSettingDto) {
    console.log(dto.chatLogChannel)
    return this.logSettingsService.update(guildId, dto);
  }

  @Delete(":guildId")
  @UseGuards(IsYourServer)
  remove(@Param("guildId") guildID: string) {
    return this.logSettingsService.remove(guildID);
  }
}
