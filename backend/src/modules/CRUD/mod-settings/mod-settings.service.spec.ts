import { Test, TestingModule } from '@nestjs/testing';
import { ModSettingsService } from './mod-settings.service';

describe('ModSettingsService', () => {
  let service: ModSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModSettingsService],
    }).compile();

    service = module.get<ModSettingsService>(ModSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
