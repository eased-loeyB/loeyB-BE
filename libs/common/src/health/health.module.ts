import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import {
  AUTHENTICATION_FACTORY,
  STARDUST_FACTORY,
  FILE_FACTORY,
} from '../../../../apps/gateway/src/factory/client-proxy.factory';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [TerminusModule],
  providers: [
    HealthService,
    AUTHENTICATION_FACTORY,
    FILE_FACTORY,
    STARDUST_FACTORY,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
