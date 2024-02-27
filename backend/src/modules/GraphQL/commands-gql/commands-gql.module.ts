import { Module } from '@nestjs/common';
import { CommandsGqlService } from './commands-gql.service';
import { CommandsGqlResolver } from './commands-gql.resolver';

@Module({
  providers: [CommandsGqlResolver, CommandsGqlService],
})
export class CommandsGqlModule {}
