import { PUB_SUB } from '@libs/common';

import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { NotificationProxyService } from './notification.proxy.service';

@Resolver('notification')
export class NotificationResolver {
  private readonly logger: Logger;
  private readonly serviceName: string = 'Notification';

  constructor(
    private readonly notificationService: NotificationProxyService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) {
    this.logger = new Logger('NotificationResolver');
  }
}
