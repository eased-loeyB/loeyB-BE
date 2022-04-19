import { LOEYBConfigModule } from '@libs/common/config/loeyb-config.module';
import { LOEYBConfigService } from '@libs/common/config/loeyb-config.service';
import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [LOEYBConfigModule],
      inject: [LOEYBConfigService],
      useFactory: async (config: LOEYBConfigService) => ({
        store: redisStore,
        host: 'loeyb-develop.fvwiek.0001.apn2.cache.amazonaws.com',
        port: config.redisPort,
        ttl: null,
      }),
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
