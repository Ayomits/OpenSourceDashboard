import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommandsGqlInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
