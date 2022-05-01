import { Test, TestingModule } from '@nestjs/testing';
import { UserActivityLogController } from './user-activity-log.controller';
import { UserActivityLogService } from './user-activity-log.service';

describe('UserActivityLogController', () => {
  let userActivityLogController: UserActivityLogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserActivityLogController],
      providers: [UserActivityLogService],
    }).compile();

    userActivityLogController = app.get<UserActivityLogController>(UserActivityLogController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userActivityLogController.getHello()).toBe('Hello World!');
    });
  });
});
