import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationProxyService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy,
  ) {}
}
