import { Module } from '@nestjs/common';
import { LogSettingsGqlService } from './log-settings-gql.service';
import { LogSettingsGqlResolver } from './log-settings-gql.resolver';

@Module({
  providers: [LogSettingsGqlResolver, LogSettingsGqlService],
})
export class LogSettingsGqlModule {}
