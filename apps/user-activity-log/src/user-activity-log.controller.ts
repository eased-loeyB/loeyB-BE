import { UserActivityLogInput } from '@libs/common/dto';
import { TransactionBlock } from '@libs/common/transaction/transaction';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserActivityLogService } from './user-activity-log.service';

@Controller()
export class UserActivityLogController {
  constructor(
    private readonly userActivityLogService: UserActivityLogService,
  ) {}

  @MessagePattern({ cmd: 'writeUserActivityLog' })
  async writeUserActivityLog(
    @Payload() input: UserActivityLogInput,
  ): Promise<void> {
    return await TransactionBlock(input, async (input, entityManager) => {
      return await this.userActivityLogService.writeUserActivityLog(
        input as UserActivityLogInput,
        entityManager,
      );
    });
  }
}
