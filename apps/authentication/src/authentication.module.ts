import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LOEYBConfigModule } from 'configs/loeyb-config.module';
import { LOEYBConfigService } from 'configs/loeyb-config.service';
import { AUTHENTICATION_FACTORY } from 'apps/gateway/src/factory';

@Module({
  imports: [LOEYBConfigModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LOEYBConfigService,
    AUTHENTICATION_FACTORY,
  ],
})
export class AuthenticationModule {}
