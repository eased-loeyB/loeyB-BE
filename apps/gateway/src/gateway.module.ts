import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { GateGateway } from './gate.gateway';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [GatewayController],
  providers: [GatewayService, GateGateway],
})
export class GatewayModule {}
