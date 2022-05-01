import { LOEYBConfigModule } from '@libs/common/config/loeyb-config.module';
import { MSPingModule } from '@libs/common/health/ping/ms.ping.module';
import { DatabaseModule } from '@libs/database';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { Scheduler } from './scheduler';

@Module({
  imports: [
    LOEYBConfigModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
    MSPingModule,
  ],
  providers: [Scheduler],
})
export class SchedulerModule {}
