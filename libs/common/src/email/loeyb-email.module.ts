import { Module } from '@nestjs/common';

import { LOEYBConfigModule } from '../config/loeyb-config.module';
import { LOEYBEmailService } from './loeyb-email.service';

@Module({
  imports: [LOEYBConfigModule],
  providers: [LOEYBEmailService],
  exports: [LOEYBEmailService],
})
export class LOEYBEmailModule {}
