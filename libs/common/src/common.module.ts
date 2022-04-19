import { Global, Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { LOEYBConfigModule } from './config/loeyb-config.module';
import { LOEYBConfigService } from './config/loeyb-config.service';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  imports: [LOEYBConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      inject: [LOEYBConfigService],
      useFactory: (configService: LOEYBConfigService) =>
        new RedisPubSub({
          connection: {
            host: configService.redisHost,
            port: configService.redisPort,
          },
        }),
    },
  ],
  exports: [PUB_SUB],
})
export class CommonModule {}
