import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateModSettingsGqlInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
