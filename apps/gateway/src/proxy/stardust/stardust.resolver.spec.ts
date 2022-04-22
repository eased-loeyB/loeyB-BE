import { Test, TestingModule } from '@nestjs/testing';
import { StardustResolver } from './stardust.resolver';

describe('StardustResolver', () => {
  let resolver: StardustResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StardustResolver],
    }).compile();

    resolver = module.get<StardustResolver>(StardustResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
