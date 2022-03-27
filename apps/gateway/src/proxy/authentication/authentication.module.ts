import { Module } from '@nestjs/common';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';
import { AUTHENTICATION_FACTORY } from '../../factory';

@Module({
  imports: [],
  providers: [
    AUTHENTICATION_FACTORY,
    AuthenticationService,
    AuthenticationResolver,
  ],
})
export class AuthenticationModule {}
