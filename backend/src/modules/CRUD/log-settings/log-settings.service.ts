import { Injectable } from '@nestjs/common';
import { CreateLogSettingDto } from './dto/create-log-setting.dto';
import { UpdateLogSettingDto } from './dto/update-log-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogSettingEntity } from './entities/log-setting.entity';
import { Repository } from 'typeorm';

// !TODO

@Injectable()
export class LogSettingsService {
  constructor(
    @InjectRepository(LogSettingEntity) private logSettingsRepository: Repository<LogSettingEntity>
  ) {}

  async create(createLogSettingDto: CreateLogSettingDto) {
    
  }

  async findOne(guildId: string) {
    
  }

  async update(updateLogSettingDto: UpdateLogSettingDto) {
    
  }

  async remove(guildId: string) {
    return 
  }
}
