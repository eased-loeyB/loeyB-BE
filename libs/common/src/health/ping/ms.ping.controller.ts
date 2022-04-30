import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class MSPingController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly typeOrm: TypeOrmHealthIndicator,
  ) {}

  @MessagePattern({ cmd: 'ping' })
  async ping(name: string): Promise<HealthCheckResult> {
    return this.health.check([
      async () =>
        this.typeOrm.pingCheck(`${name} postgresql check`, { timeout: 1500 }),
    ]);
  }
}
