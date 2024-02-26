import { Test, TestingModule } from '@nestjs/testing';
import { LogSettingsController } from './log-settings.controller';
import { LogSettingsService } from './log-settings.service';

describe('LogSettingsController', () => {
  let controller: LogSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogSettingsController],
      providers: [LogSettingsService],
    }).compile();

    controller = module.get<LogSettingsController>(LogSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
