import { CreateCommandsGqlInput } from './create-commands-gql.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCommandsGqlInput extends PartialType(CreateCommandsGqlInput) {
  @Field(() => Int)
  id: number;
}
