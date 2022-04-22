import { Module } from '@nestjs/common';
import { STARDUST_FACTORY } from '../../factory';
import { StardustResolver } from './stardust.resolver';
import { StardustService } from './stardust.service';

@Module({
  imports: [],
  providers: [STARDUST_FACTORY, StardustService, StardustResolver],
})
export class StardustModule {}
