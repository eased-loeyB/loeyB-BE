import { LOEYBConfigModule } from '@libs/common/config/loeyb-config.module';
import { MSPingModule } from '@libs/common/health/ping/ms.ping.module';
import { DatabaseModule } from '@libs/database';
import { LOEYBUserActivityLogRepository } from '@libs/database/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserActivityLogController } from './user-activity-log.controller';
import { UserActivityLogService } from './user-activity-log.service';

@Module({
  imports: [
    LOEYBConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([LOEYBUserActivityLogRepository]),
    MSPingModule,
  ],
  controllers: [UserActivityLogController],
  providers: [UserActivityLogService],
})
export class UserActivityLogModule {}
