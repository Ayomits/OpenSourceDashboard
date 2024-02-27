import { Test, TestingModule } from '@nestjs/testing';
import { LogSettingsGqlService } from './log-settings-gql.service';

describe('LogSettingsGqlService', () => {
  let service: LogSettingsGqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogSettingsGqlService],
    }).compile();

    service = module.get<LogSettingsGqlService>(LogSettingsGqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
