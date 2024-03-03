import { Module } from '@nestjs/common';
import { ModSettingsService } from './mod-settings.service';
import { ModSettingsController } from './mod-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ModSettingsEntity } from './entities/mod-setting.entity';

const entities = [ModSettingsEntity]
const services = [ModSettingsService]
const controllers = [ModSettingsController]

@Module({
  imports: [AuthModule ,TypeOrmModule.forFeature(entities)],
  controllers: [...controllers],
  providers: [...services,],
  exports: [TypeOrmModule]
})
export class ModSettingsModule {}
