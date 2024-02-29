import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateLogSettingDto } from "./dto/create-log-setting.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { LogSettingEntity } from "./entities/log-setting.entity";
import { Repository } from "typeorm";
import { Cache } from "@nestjs/cache-manager";
import { measureTime } from "src/common/decorators/measureTime.decorator";

// Working with LogSettingsEntity
// Universal CRUD service

@Injectable()
export class LogSettingsService {
  ttl: number = 60_000;

  constructor(
    @InjectRepository(LogSettingEntity)
    private repository: Repository<LogSettingEntity>,
    private readonly cacheManager: Cache
  ) {}

  async create(dto: CreateLogSettingDto) {
    const key = `log-settings-${dto.guildId}`;
    const existedSettings = await this.findInCache(key) || await this.findOne(dto.guildId);
  
    if (!existedSettings) {
      const query = this.repository.create(dto);
      const newSettings = await this.repository.save(query);
      await this.cacheManager.set(key, newSettings, this.ttl);
      return newSettings;
    }
    throw new BadRequestException(`This settings already exists. Use /update endpoint`)
  }

  async update(guildId: string, dto: CreateLogSettingDto) {
    const key = `log-settings-${guildId}`;
    
    const existedSettings = await this.findInCache(key) || await this.findOne(guildId);
    if (!existedSettings) {
      throw new BadRequestException(`This server hasn't settings`)
    }
    await this.repository.update(guildId, {
      chatLogChannel: dto.chatLogChannel,
      voiceLogChannel: dto.voiceLogChannel,
      economyLogChannel: dto.economyLogChannel
    })
    const newSettings = await this.repository.findOne({where: {guildId: guildId}})
    
    await this.cacheManager.set(key, newSettings, this.ttl);
  
    return {
      oldSettings: existedSettings,
      newSettings: newSettings,
    };
  }
  

  async findInCache(key: string) {
    return await this.cacheManager.get(key);
  }

  async findOne(guildId: string): Promise<LogSettingEntity> {
    const settingsInCache = await this.findInCache(`log-settings-${guildId}`);

    if (settingsInCache) {
      return settingsInCache as LogSettingEntity;
    }
    
    const settings = await this.repository.findOne({
      where: { guildId: guildId },
    });
    await this.cacheManager.set(`log-settings-${guildId}`, settings, this.ttl);
    return settings;
  }

  async remove(guildId: string) {
    const settings = await this.findOne(guildId);
    if (!settings) {
      throw new BadRequestException(`Settings for this server doesn't exists`);
    }

    await this.cacheManager.del(`log-settings-${guildId}`)

    return await this.repository.delete(guildId);
  }

}
