import { CreateModSettingsGqlInput } from './create-mod-settings-gql.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateModSettingsGqlInput extends PartialType(CreateModSettingsGqlInput) {
  @Field(() => Int)
  id: number;
}
