import { LOEYBConfigModule } from '@libs/common/config/loeyb-config.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../libs/database/src/index';
import { RedisCacheModule } from '../../../libs/cache/src';

import { StardustController } from './stardust.controller';
import { StardustService } from './stardust.service';
import { LOEYBConfigService } from '../../../libs/common/src/config/loeyb-config.service';
import {
  LOEYBUserCategoryTagRepository,
  LOEYBUserAreaCategoryRepository,
  LOEYBUserRepository,
} from '@libs/database/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { STARDUST_FACTORY } from 'apps/gateway/src/factory';

@Module({
  imports: [
    LOEYBConfigModule,
    DatabaseModule,
    RedisCacheModule,
    TypeOrmModule.forFeature([
      LOEYBUserRepository,
      LOEYBUserCategoryTagRepository,
      LOEYBUserAreaCategoryRepository,
    ]),
  ],
  controllers: [StardustController],
  providers: [StardustService, LOEYBConfigService, STARDUST_FACTORY],
})
export class StardustModule {}
