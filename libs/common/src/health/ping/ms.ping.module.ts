import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { MSPingController } from './ms.ping.controller';

@Module({
  imports: [TerminusModule],
  controllers: [MSPingController],
  exports: [TerminusModule],
})
export class MSPingModule {}
