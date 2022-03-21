import { Module } from '@nestjs/common';
import { AuthenticationResolver } from './authentication/authentication.resolver';
import { AuthenticationService } from './authentication/authentication.service';
import { Authentication.ProxyService } from './authentication.proxy/authentication.proxy.service';

@Module({
  providers: [AuthenticationResolver, AuthenticationService, Authentication.ProxyService]
})
export class ProxyModule {}
