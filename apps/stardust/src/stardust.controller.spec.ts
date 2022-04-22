import { Test, TestingModule } from '@nestjs/testing';
import { StardustController } from './stardust.controller';
import { StardustService } from './stardust.service';

describe('StardustController', () => {
  let stardustController: StardustController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StardustController],
      providers: [StardustService],
    }).compile();

    stardustController = app.get<StardustController>(StardustController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(stardustController.getHello()).toBe('Hello World!');
    });
  });
});
