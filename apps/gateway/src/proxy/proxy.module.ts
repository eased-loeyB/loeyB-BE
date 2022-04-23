import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';

import { FileModule } from './file/file.module';
import { StardustModule } from './stardust/stardust.module';

@Module({
  imports: [AuthenticationModule, StardustModule, FileModule],
})
export class ProxyModule {}
