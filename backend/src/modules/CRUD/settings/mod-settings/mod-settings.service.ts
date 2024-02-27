import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateModSettingDto } from './dto/create-mod-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ModSettingsEntity } from './entities/mod-setting.entity';
import { Repository } from 'typeorm';

// Working with ModSettingsEntity
// Universal CRUD service

@Injectable()
export class ModSettingsService {
  constructor(
    @InjectRepository(ModSettingsEntity)
    private repository: Repository<ModSettingsEntity>
  ) {}

  async createOrUpdate(dto: CreateModSettingDto) {
    const existedSettings = await this.findOne(dto.guildId);
    if (existedSettings) {
      await this.update(dto.guildId, dto);
      const newSettings = await this.findOne(dto.guildId);
      return {
        oldSettings: existedSettings,
        newSettings: newSettings,
      };
    }
    const query = this.repository.create(dto);
    return await this.repository.save(query);
  }

  async findOne(guildId: string) {
    const settings = await this.repository.findOne({
      where: { guildId: guildId },
    });
    return settings;
  }

  async remove(guildId: string) {
    const settings = await this.findOne(guildId);
    if (!settings) {
      throw new BadRequestException(`Settings for this server doesn't exists`);
    }
    return await this.repository.delete(guildId);
  }

  private async update(guildId: string, dto: CreateModSettingDto) {
    return await this.repository.update(guildId, dto);
  }
}
