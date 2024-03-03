import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ModSettingsService } from './mod-settings.service';
import { CreateModSettingDto } from './dto/create-mod-setting.dto';
import { UpdateModSettingDto } from './dto/update-mod-setting.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsYourServer } from 'src/modules/auth/guards/isYourServer.guard';
import { IsAuth } from 'src/modules/auth/guards/isAuth.guard';

@Controller('mod-settings')
@ApiTags(`mod-settings`)
export class ModSettingsController {
  constructor(private readonly modSettingsService: ModSettingsService) {}

  @Post(`create`) // This method Create Or Update guild log-settings in DB
  @UseGuards(IsYourServer)
  create(@Body() createLogSettingDto: CreateModSettingDto) {
    return this.modSettingsService.create(createLogSettingDto);
  }

  @Get(":guildId/all")
  find(@Param("guildId") guildId: string) {
    return this.modSettingsService.findOne(guildId);
  }

  @Patch(`:guildId/update`)
  @UseGuards(IsYourServer)
  update(@Param('guildId') guildId: string, @Body() dto: CreateModSettingDto) {
    
  }

  @Delete(":guildId")
  @UseGuards(IsYourServer)
  remove(@Param("guildId") guildID: string) {
    return this.modSettingsService.remove(guildID);
  }
}
