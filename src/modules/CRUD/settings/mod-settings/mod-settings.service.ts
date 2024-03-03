import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateModSettingDto } from './dto/create-mod-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ModSettingsEntity } from './entities/mod-setting.entity';
import { Repository } from 'typeorm';
import { measureTime } from 'src/common/decorators/measureTime.decorator';
import { Cache } from '@nestjs/cache-manager';
// Working with ModSettingsEntity
// Universal CRUD service

@Injectable()
export class ModSettingsService {
  ttl: number = 60_000;

  constructor(
    @InjectRepository(ModSettingsEntity)
    private repository: Repository<ModSettingsEntity>,
    private readonly cacheManager: Cache
  ) {}

  async create(dto: CreateModSettingDto) {
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

  async update(guildID: string, dto: CreateModSettingDto) {
    const key = `log-settings-${guildID}`;
    
    const existedSettings = await this.findInCache(key) || await this.findOne(guildID);
    if (!existedSettings) {
      throw new BadRequestException(`This server hasn't settings`)
    }
    await this.repository.update(guildID, {
      defaultReason: dto.defaultReason,
      defaultTimeout: dto.defaultTimeout,
      defaultWarnsToMute: dto.defaultWarnsToMute,
      trustedBanRoles: dto.trustedBanRoles,
      trustedMuteRoles: dto.trustedMuteRoles,
      muteRole: dto.muteRole,
      warnRole: dto.warnRole,
      modRoles: dto.modRoles
    })
    const newSettings = await this.repository.findOne({where: {guildId: guildID}})
    
    await this.cacheManager.set(key, newSettings, this.ttl);
  
    return {
      oldSettings: existedSettings,
      newSettings: newSettings,
    };
  }
  

  private async findInCache(key: string) {
    return await this.cacheManager.get(key);
  }

  @measureTime
  async findOne(guildId: string): Promise<ModSettingsEntity> {
    const settingsInCache = await this.findInCache(`log-settings-${guildId}`);

    if (settingsInCache) {
      return settingsInCache as ModSettingsEntity;
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

