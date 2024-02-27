import { Test, TestingModule } from '@nestjs/testing';
import { ModSettingsGqlResolver } from './mod-settings-gql.resolver';
import { ModSettingsGqlService } from './mod-settings-gql.service';

describe('ModSettingsGqlResolver', () => {
  let resolver: ModSettingsGqlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModSettingsGqlResolver, ModSettingsGqlService],
    }).compile();

    resolver = module.get<ModSettingsGqlResolver>(ModSettingsGqlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
