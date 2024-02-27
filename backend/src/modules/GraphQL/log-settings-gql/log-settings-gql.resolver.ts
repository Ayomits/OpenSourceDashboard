import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LogSettingsGqlService } from './log-settings-gql.service';
import { LogSettingsGql } from './entities/log-settings-gql.entity';
import { CreateLogSettingsGqlInput } from './dto/create-log-settings-gql.input';
import { UpdateLogSettingsGqlInput } from './dto/update-log-settings-gql.input';

@Resolver(() => LogSettingsGql)
export class LogSettingsGqlResolver {
  constructor(private readonly logSettingsGqlService: LogSettingsGqlService) {}

  @Mutation(() => LogSettingsGql)
  createLogSettingsGql(@Args('createLogSettingsGqlInput') createLogSettingsGqlInput: CreateLogSettingsGqlInput) {
    return this.logSettingsGqlService.create(createLogSettingsGqlInput);
  }

  @Query(() => [LogSettingsGql], { name: 'logSettingsGql' })
  findAll() {
    return this.logSettingsGqlService.findAll();
  }

  @Query(() => LogSettingsGql, { name: 'logSettingsGql' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.logSettingsGqlService.findOne(id);
  }

  @Mutation(() => LogSettingsGql)
  updateLogSettingsGql(@Args('updateLogSettingsGqlInput') updateLogSettingsGqlInput: UpdateLogSettingsGqlInput) {
    return this.logSettingsGqlService.update(updateLogSettingsGqlInput.id, updateLogSettingsGqlInput);
  }

  @Mutation(() => LogSettingsGql)
  removeLogSettingsGql(@Args('id', { type: () => Int }) id: number) {
    return this.logSettingsGqlService.remove(id);
  }
}
