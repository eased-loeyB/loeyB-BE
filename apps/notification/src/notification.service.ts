import { Injectable, Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '@libs/common';

@Injectable()
export class NotificationService {
  constructor(@Inject(PUB_SUB) private readonly pubSub: RedisPubSub) {}
  getHello(): string {
    return 'Hello World!';
  }
}
