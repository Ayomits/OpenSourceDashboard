import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LogSettingsService } from './log-settings.service';
import { CreateLogSettingDto } from './dto/create-log-setting.dto';
import { UpdateLogSettingDto } from './dto/update-log-setting.dto';
import { IsYourServer } from 'src/modules/auth/guards/isYourServer.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('log-settings')
@ApiTags(`log-settings`)
export class LogSettingsController {
  constructor(private readonly logSettingsService: LogSettingsService) {}

  @Post()
  create(@Body() createLogSettingDto: CreateLogSettingDto) {}

  @Get(':guildId/all')
  @UseGuards(IsYourServer)
  find(@Param('guildId') guildId: string) {
    return `hello world`
  }

  @Patch(':guildId')
  @UseGuards(IsYourServer)
  update(@Param('id') guildID: string, @Body() updateLogSettingDto: UpdateLogSettingDto) {}

  @Delete(':guildId')
  @UseGuards(IsYourServer)
  remove(@Param('id') guildID: string) {}
}
