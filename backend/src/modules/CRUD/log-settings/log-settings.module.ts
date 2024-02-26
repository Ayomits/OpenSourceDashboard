import { Module } from '@nestjs/common';
import { LogSettingsService } from './log-settings.service';
import { LogSettingsController } from './log-settings.controller';

@Module({
  controllers: [LogSettingsController],
  providers: [LogSettingsService],
})
export class LogSettingsModule {}
