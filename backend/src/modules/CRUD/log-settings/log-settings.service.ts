import { Injectable } from '@nestjs/common';
import { CreateLogSettingDto } from './dto/create-log-setting.dto';
import { UpdateLogSettingDto } from './dto/update-log-setting.dto';

@Injectable()
export class LogSettingsService {
  create(createLogSettingDto: CreateLogSettingDto) {
    return 'This action adds a new logSetting';
  }

  findAll() {
    return `This action returns all logSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logSetting`;
  }

  update(id: number, updateLogSettingDto: UpdateLogSettingDto) {
    return `This action updates a #${id} logSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} logSetting`;
  }
}
