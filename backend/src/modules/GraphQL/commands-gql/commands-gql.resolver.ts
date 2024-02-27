import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommandsGqlService } from './commands-gql.service';
import { CommandsGql } from './entities/commands-gql.entity';
import { CreateCommandsGqlInput } from './dto/create-commands-gql.input';
import { UpdateCommandsGqlInput } from './dto/update-commands-gql.input';

@Resolver(() => CommandsGql)
export class CommandsGqlResolver {
  constructor(private readonly commandsGqlService: CommandsGqlService) {}

  @Mutation(() => CommandsGql)
  createCommandsGql(@Args('createCommandsGqlInput') createCommandsGqlInput: CreateCommandsGqlInput) {
    return this.commandsGqlService.create(createCommandsGqlInput);
  }

  @Query(() => [CommandsGql], { name: 'commandsGql' })
  findAll() {
    return this.commandsGqlService.findAll();
  }

  @Query(() => CommandsGql, { name: 'commandsGql' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commandsGqlService.findOne(id);
  }

  @Mutation(() => CommandsGql)
  updateCommandsGql(@Args('updateCommandsGqlInput') updateCommandsGqlInput: UpdateCommandsGqlInput) {
    return this.commandsGqlService.update(updateCommandsGqlInput.id, updateCommandsGqlInput);
  }

  @Mutation(() => CommandsGql)
  removeCommandsGql(@Args('id', { type: () => Int }) id: number) {
    return this.commandsGqlService.remove(id);
  }
}
