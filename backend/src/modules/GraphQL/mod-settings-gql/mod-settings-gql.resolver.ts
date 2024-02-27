import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ModSettingsGqlService } from './mod-settings-gql.service';
import { ModSettingsGql } from './entities/mod-settings-gql.entity';
import { CreateModSettingsGqlInput } from './dto/create-mod-settings-gql.input';
import { UpdateModSettingsGqlInput } from './dto/update-mod-settings-gql.input';

@Resolver(() => ModSettingsGql)
export class ModSettingsGqlResolver {
  constructor(private readonly modSettingsGqlService: ModSettingsGqlService) {}

  @Mutation(() => ModSettingsGql)
  createModSettingsGql(@Args('createModSettingsGqlInput') createModSettingsGqlInput: CreateModSettingsGqlInput) {
    return this.modSettingsGqlService.create(createModSettingsGqlInput);
  }

  @Query(() => [ModSettingsGql], { name: 'modSettingsGql' })
  findAll() {
    return this.modSettingsGqlService.findAll();
  }

  @Query(() => ModSettingsGql, { name: 'modSettingsGql' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.modSettingsGqlService.findOne(id);
  }

  @Mutation(() => ModSettingsGql)
  updateModSettingsGql(@Args('updateModSettingsGqlInput') updateModSettingsGqlInput: UpdateModSettingsGqlInput) {
    return this.modSettingsGqlService.update(updateModSettingsGqlInput.id, updateModSettingsGqlInput);
  }

  @Mutation(() => ModSettingsGql)
  removeModSettingsGql(@Args('id', { type: () => Int }) id: number) {
    return this.modSettingsGqlService.remove(id);
  }
}
