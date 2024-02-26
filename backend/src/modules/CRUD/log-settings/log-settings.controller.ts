import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogSettingsService } from './log-settings.service';
import { CreateLogSettingDto } from './dto/create-log-setting.dto';
import { UpdateLogSettingDto } from './dto/update-log-setting.dto';

@Controller('log-settings')
export class LogSettingsController {
  constructor(private readonly logSettingsService: LogSettingsService) {}

  @Post()
  create(@Body() createLogSettingDto: CreateLogSettingDto) {
    return this.logSettingsService.create(createLogSettingDto);
  }

  @Get()
  findAll() {
    return this.logSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogSettingDto: UpdateLogSettingDto) {
    return this.logSettingsService.update(+id, updateLogSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logSettingsService.remove(+id);
  }
}
