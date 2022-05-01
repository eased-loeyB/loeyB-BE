import { LOEYBConfigService } from '@libs/common/config/loeyb-config.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SchedulerModule } from './scheduler.module';

async function bootstrap() {
  const app = await NestFactory.create(SchedulerModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService: LOEYBConfigService =
    app.get<LOEYBConfigService>(LOEYBConfigService);

  Logger.log(`scheduler is running on [${configService.nodeEnv}]`);

  await app.listen(3001);
}

void bootstrap();
