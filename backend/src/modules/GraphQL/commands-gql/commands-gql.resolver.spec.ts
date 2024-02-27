import { Test, TestingModule } from '@nestjs/testing';
import { CommandsGqlResolver } from './commands-gql.resolver';
import { CommandsGqlService } from './commands-gql.service';

describe('CommandsGqlResolver', () => {
  let resolver: CommandsGqlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandsGqlResolver, CommandsGqlService],
    }).compile();

    resolver = module.get<CommandsGqlResolver>(CommandsGqlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
