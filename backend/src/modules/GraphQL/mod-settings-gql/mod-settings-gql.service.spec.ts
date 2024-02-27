import { Test, TestingModule } from '@nestjs/testing';
import { ModSettingsGqlService } from './mod-settings-gql.service';

describe('ModSettingsGqlService', () => {
  let service: ModSettingsGqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModSettingsGqlService],
    }).compile();

    service = module.get<ModSettingsGqlService>(ModSettingsGqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
