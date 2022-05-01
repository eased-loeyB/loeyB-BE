import { CommonModule } from '@libs/common';
import { LOEYBConfigModule } from '@libs/common/config/loeyb-config.module';
import { MSPingModule } from '@libs/common/health/ping/ms.ping.module';
import { DatabaseModule } from '@libs/database';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    CommonModule,
    LOEYBConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([]),
    MSPingModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
