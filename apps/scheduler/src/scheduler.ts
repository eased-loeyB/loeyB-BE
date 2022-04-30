import {
  LOEYBConfigService,
  Environment,
} from '@libs/common/config/loeyb-config.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class Scheduler {
  private readonly logger: Logger = new Logger(Scheduler.name);
  constructor(private readonly config: LOEYBConfigService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    console.log('Scheduler is working');
  }
}
