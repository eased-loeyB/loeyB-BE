import { LOEYBConfigService } from '@app/common/config/loeyb-config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { DatabaseService } from './database.service';
import { LOEYBNamingStrategy } from './loeyb-naming.strategy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (
        config: LOEYBConfigService,
      ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions => ({
        type: 'postgres',
        host: config.dbHost,
        port: config.dbPort,
        username: config.dbUsername,
        password: config.dbPassword,
        schema: config.dbSchema,
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
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
