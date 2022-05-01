import { CommonModule } from '@libs/common';
import { NOTIFICATION_FACTORY } from '../../factory';
import { Module } from '@nestjs/common';

import { NotificationProxyService } from './notification.proxy.service';
import { NotificationResolver } from './notification.resolver';

@Module({
  imports: [CommonModule],
  providers: [
    NOTIFICATION_FACTORY,
    NotificationProxyService,
    NotificationResolver,
  ],
})
export class NotificationModule {}
