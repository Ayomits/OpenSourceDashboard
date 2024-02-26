import { Test, TestingModule } from '@nestjs/testing';
import { ModSettingsController } from './mod-settings.controller';
import { ModSettingsService } from './mod-settings.service';

describe('ModSettingsController', () => {
  let controller: ModSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModSettingsController],
      providers: [ModSettingsService],
    }).compile();

    controller = module.get<ModSettingsController>(ModSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
