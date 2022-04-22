import { LOEYBConfigModule } from '../../common/src/config/loeyb-config.module';
import { LOEYBConfigService } from '../../common/src/config/loeyb-config.service';
import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [LOEYBConfigModule],
      inject: [LOEYBConfigService],
      useFactory: async (config: LOEYBConfigService) => ({
        store: redisStore,
        host: config.redisHost,
        port: config.redisPort,
        ttl: null,
      }),
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
