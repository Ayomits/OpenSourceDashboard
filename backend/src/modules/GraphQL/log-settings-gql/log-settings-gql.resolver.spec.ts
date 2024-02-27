import { Test, TestingModule } from '@nestjs/testing';
import { LogSettingsGqlResolver } from './log-settings-gql.resolver';
import { LogSettingsGqlService } from './log-settings-gql.service';

describe('LogSettingsGqlResolver', () => {
  let resolver: LogSettingsGqlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogSettingsGqlResolver, LogSettingsGqlService],
    }).compile();

    resolver = module.get<LogSettingsGqlResolver>(LogSettingsGqlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
