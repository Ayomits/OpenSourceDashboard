import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLogSettingsGqlInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
