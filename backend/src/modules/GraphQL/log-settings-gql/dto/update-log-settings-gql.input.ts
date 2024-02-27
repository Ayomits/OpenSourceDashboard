import { CreateLogSettingsGqlInput } from './create-log-settings-gql.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLogSettingsGqlInput extends PartialType(CreateLogSettingsGqlInput) {
  @Field(() => Int)
  id: number;
}
