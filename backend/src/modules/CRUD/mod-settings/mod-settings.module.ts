import { Module } from '@nestjs/common';
import { ModSettingsService } from './mod-settings.service';
import { ModSettingsController } from './mod-settings.controller';

@Module({
  controllers: [ModSettingsController],
  providers: [ModSettingsService],
})
export class ModSettingsModule {}
