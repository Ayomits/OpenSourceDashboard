import { Module } from '@nestjs/common';
import { ModSettingsGqlService } from './mod-settings-gql.service';
import { ModSettingsGqlResolver } from './mod-settings-gql.resolver';

@Module({
  providers: [ModSettingsGqlResolver, ModSettingsGqlService],
})
export class ModSettingsGqlModule {}
