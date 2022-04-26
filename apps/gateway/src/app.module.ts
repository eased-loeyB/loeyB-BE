import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import { ProxyModule } from './proxy/proxy.module';
import { StrategyModule } from './strategy/strategy.module';
import { ErrorFormatter } from '../../../libs/common/src/util/error-formatter';
import { ResponseFormatter } from '../../../libs/common/src/util/response-formatter';
import { LOEYBConfigService } from '../../../libs/common/src/config/loeyb-config.service';
import { LOEYBConfigModule } from '../../../libs/common/src/config/loeyb-config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

@Module({
  imports: [
    ProxyModule,
    LOEYBConfigModule,
    StrategyModule,
    ThrottlerModule.forRootAsync({
      useFactory: async (config: LOEYBConfigService) => ({
        ttl: 1,
        limit: 10,
        storage: new ThrottlerStorageRedisService({
          host: config.redisHost,
          port: config.redisPort,
        }),
      }),
      inject: [LOEYBConfigService],
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: async (config: LOEYBConfigService) => ({
        path: '/v1/graphql',
        installSubscriptionHandlers: true,
        autoSchemaFile: 'schema.gql',
        playground: true,
        context: async ({ req, connection }) => {
          if (connection) {
            return {
              req: {
                headers: {
                  authorization: connection.context.Authorization,
                },
              },
            };
          } else return { req };
        },
        formatError: (error: GraphQLError) => ErrorFormatter.format(error),
        formatResponse: (response) => ResponseFormatter.format(response),
        subscriptions: {
          path: '/v1/graphql',
          keepAlive: 10000,
        },
      }),
      inject: [LOEYBConfigService],
    }),
  ],
})
export class AppModule {}
