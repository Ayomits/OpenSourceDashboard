import { Test, TestingModule } from '@nestjs/testing';
import { LogSettingsService } from './log-settings.service';

describe('LogSettingsService', () => {
  let service: LogSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogSettingsService],
    }).compile();

    service = module.get<LogSettingsService>(LogSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
