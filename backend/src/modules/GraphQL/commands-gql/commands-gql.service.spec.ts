import { Test, TestingModule } from '@nestjs/testing';
import { CommandsGqlService } from './commands-gql.service';

describe('CommandsGqlService', () => {
  let service: CommandsGqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandsGqlService],
    }).compile();

    service = module.get<CommandsGqlService>(CommandsGqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
