import { Test, TestingModule } from '@nestjs/testing';
import { StardustService } from './stardust.service';

describe('StardustService', () => {
  let service: StardustService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StardustService],
    }).compile();

    service = module.get<StardustService>(StardustService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
