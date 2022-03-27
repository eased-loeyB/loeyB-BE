import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import { ProxyModule } from './proxy/proxy.module';
import { ErrorFormatter } from '../../../utils/error-formatter';
import { ResponseFormatter } from '../../../utils/response-formatter';
import { LOEYBConfigService } from '../../../configs/loeyb-config.service';
import { LOEYBConfigModule } from '../../../configs/loeyb-config.module';

@Module({
  imports: [
    ProxyModule,
    LOEYBConfigModule,
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
