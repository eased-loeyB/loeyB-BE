import { UserActivityLogInput } from '@libs/common/dto';
import { LOEYBUserActivityLogEntity } from '@libs/database/entities';
import { LOEYBUserActivityLogRepository } from '@libs/database/repositories';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
@Injectable()
export class UserActivityLogService {
  async writeUserActivityLog(
    input: UserActivityLogInput,
    entityManager: EntityManager,
  ): Promise<void> {
    const loeybUserActivityLogRepository: LOEYBUserActivityLogRepository =
      entityManager.getCustomRepository<LOEYBUserActivityLogRepository>(
        LOEYBUserActivityLogRepository,
      );

    const loeybUserActivityLog: LOEYBUserActivityLogEntity =
      loeybUserActivityLogRepository.create({
        email: input.email,
        activityType: input.activityType,
        activitiId: input.activitiId,
        ip: input.ip,
        os: input.os,
        deviceType: input.deviceType,
        browser: input.browser,
      });

    await entityManager.save(loeybUserActivityLog);
  }
}
