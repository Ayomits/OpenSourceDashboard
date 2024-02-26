import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModSettingsService } from './mod-settings.service';
import { CreateModSettingDto } from './dto/create-mod-setting.dto';
import { UpdateModSettingDto } from './dto/update-mod-setting.dto';

@Controller('mod-settings')
export class ModSettingsController {
  constructor(private readonly modSettingsService: ModSettingsService) {}

  @Post()
  create(@Body() createModSettingDto: CreateModSettingDto) {
    return this.modSettingsService.create(createModSettingDto);
  }

  @Get()
  findAll() {
    return this.modSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModSettingDto: UpdateModSettingDto) {
    return this.modSettingsService.update(+id, updateModSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modSettingsService.remove(+id);
  }
}
