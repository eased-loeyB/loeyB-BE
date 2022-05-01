import { USER_ACTIVITY_LOG_FACTORY } from '../../factory';

import { Module } from '@nestjs/common';

import { UserActivityLogProxyService } from './user-activity-log.proxy.service';
import { UserActivityLogResolver } from './user-activity-log.resolver';

@Module({
  providers: [
    USER_ACTIVITY_LOG_FACTORY,
    UserActivityLogProxyService,
    UserActivityLogResolver,
  ],
})
export class UserActivityLogModule {}
