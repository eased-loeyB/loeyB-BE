import { LOEYBConfigModule } from '../../../libs/common/src/config/loeyb-config.module';
import { LOEYBConfigService } from '../../../libs/common/src/config/loeyb-config.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

import { LOEYBNamingStrategy } from '.';

async function ormConfig(): Promise<TypeOrmModuleOptions> {
  const cli = await NestFactory.create<NestExpressApplication>(
    LOEYBConfigModule,
  );
  cli.useGlobalPipes(new ValidationPipe());

  const config: LOEYBConfigService =
    cli.get<LOEYBConfigService>(LOEYBConfigService);

  const ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.dbDatabase,
    schema: config.dbSchema,
    keepConnectionAlive: true,
    entities: ['entites/*.{ts, js}'],
    migrations: [join(__dirname, 'migrations/v1/*.{ts, js}')],
    subscribers: [],
    synchronize: config.dbSync,
    logging: config.dbDebug,
    extra: {
      connectionLimit: 5,
    },
    namingStrategy: new LOEYBNamingStrategy(),
  };

  return Promise.resolve(ormConfig);
}

export = ormConfig();
