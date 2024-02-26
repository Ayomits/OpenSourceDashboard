import { Injectable } from '@nestjs/common';
import { CreateModSettingDto } from './dto/create-mod-setting.dto';
import { UpdateModSettingDto } from './dto/update-mod-setting.dto';

@Injectable()
export class ModSettingsService {
  create(createModSettingDto: CreateModSettingDto) {
    return 'This action adds a new modSetting';
  }

  findAll() {
    return `This action returns all modSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modSetting`;
  }

  update(id: number, updateModSettingDto: UpdateModSettingDto) {
    return `This action updates a #${id} modSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} modSetting`;
  }
}
