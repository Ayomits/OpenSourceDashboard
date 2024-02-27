import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateLogSettingDto } from "./dto/create-log-setting.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { LogSettingEntity } from "./entities/log-setting.entity";
import { Repository } from "typeorm";

// Working with LogSettingsEntity
// Universal CRUD service

@Injectable()
export class LogSettingsService {
  constructor(
    @InjectRepository(LogSettingEntity)
    private repository: Repository<LogSettingEntity>
  ) {}

  async createOrUpdate(createLogSettingDto: CreateLogSettingDto) {
    const existedSettings = await this.findOne(createLogSettingDto.guildId);
    if (existedSettings) {
      await this.update(createLogSettingDto.guildId, createLogSettingDto);
      const newSettings = await this.findOne(createLogSettingDto.guildId);
      return {
        oldSettings: existedSettings,
        newSettings: newSettings,
      };
    }
    const query = this.repository.create(createLogSettingDto);
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

  private async update(guildId: string, dto: CreateLogSettingDto) {
    return await this.repository.update(guildId, dto);
  }
}
