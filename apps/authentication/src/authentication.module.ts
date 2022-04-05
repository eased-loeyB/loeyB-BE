import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LOEYBConfigModule } from '../../../libs/common/src/config/loeyb-config.module';
import { LOEYBConfigService } from '../../../libs/common/src/config/loeyb-config.service';
import { AUTHENTICATION_FACTORY } from 'apps/gateway/src/factory';
import { DatabaseModule } from '../../../libs/database/src/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LOEYBUserRepository } from '../../../libs/database/src/repositories';

@Module({
  imports: [
    LOEYBConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([LOEYBUserRepository]),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LOEYBConfigService,
    AUTHENTICATION_FACTORY,
  ],
})
export class AuthenticationModule {}
