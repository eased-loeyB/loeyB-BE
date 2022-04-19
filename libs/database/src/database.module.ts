import { LOEYBConfigService } from '../../../libs/common/src/config/loeyb-config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { LOEYBNamingStrategy } from './loeyb-naming.strategy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (
        config: LOEYBConfigService,
      ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions => ({
        type: 'postgres',
        host: 'loeyb-develop.cbh1v93vrfjs.ap-northeast-2.rds.amazonaws.com',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'mvp',
        schema: 'public',
        keepConnectionAlive: true,
        entities: getMetadataArgsStorage().tables.map((tb) => tb.target),
        migrations: [],
        subscribers: [],
        namingStrategy: new LOEYBNamingStrategy(),
        synchronize: config.dbSync,
        logging: config.dbDebug,
        extra: {
          max: 15,
          maxUses: 5000,
          connectionTimeoutMillis: 5000,
          idleTimeoutMillis: 1000,
        },
      }),
      inject: [LOEYBConfigService],
    }),
  ],
})
export class DatabaseModule {}
