import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
} from '@nestjs/terminus';

import { HealthService } from './health.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly service: HealthService,
  ) {}

  @Get()
  @HealthCheck()
  async healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      async () =>
        this.disk.checkStorage('gateway diskRoot under 70%  check', {
          path: '/',
          thresholdPercent: 70,
        }),
      async () =>
        this.disk.checkStorage('gateway diskTmp under 70%  check', {
          path: '/tmp',
          thresholdPercent: 70,
        }),
      async () =>
        (await this.service.isAuthenticationHealty())
          .info as HealthIndicatorResult,
      async () =>
        (await this.service.isFileHealty()).info as HealthIndicatorResult,
      async () =>
        (await this.service.isStardustHealty()).info as HealthIndicatorResult,
    ]);
  }
}
