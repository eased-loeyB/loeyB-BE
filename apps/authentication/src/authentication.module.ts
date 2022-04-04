import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LOEYBConfigModule } from '@app/common/configs/loeyb-config.module';
import { LOEYBConfigService } from '@app/common/configs/loeyb-config.service';
import { AUTHENTICATION_FACTORY } from 'libs/factory';
import { DatabaseModule } from '@app/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LOEYBUserRepository } from '@app/database/respositories/loeyb-user.repository';

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
