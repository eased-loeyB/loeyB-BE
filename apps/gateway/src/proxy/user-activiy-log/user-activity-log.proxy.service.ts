import { UserActivityLogInput } from '@libs/common/dto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserActivityLogProxyService {
  private readonly logger: Logger;

  constructor(
    @Inject('USER_ACTIVITY_LOG_SERVICE') private client: ClientProxy,
  ) {
    this.logger = new Logger('UserActivityLogProxyService');
  }

  async writeUserActivityLog(input: UserActivityLogInput): Promise<void> {
    this.logger.debug(input);
    void this.client
      .send<void, UserActivityLogInput>({ cmd: 'writeUserActivityLog' }, input)
      .toPromise();
  }
}
