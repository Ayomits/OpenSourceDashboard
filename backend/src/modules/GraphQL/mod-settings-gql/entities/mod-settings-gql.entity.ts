import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ModSettingsGql {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
