import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';

import { StardustModule } from './stardust/stardust.module';

@Module({
  imports: [AuthenticationModule, StardustModule],
})
export class ProxyModule {}
