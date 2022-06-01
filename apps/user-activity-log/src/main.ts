import { LOEYBConfigService } from '@libs/common/config/loeyb-config.service';
import { USER_ACTIVITY_LOG } from '@libs/common/constant';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { UserActivityLogModule } from './user-activity-log.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(UserActivityLogModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService: LOEYBConfigService =
    app.get<LOEYBConfigService>(LOEYBConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `${configService.rabbitmqProto}://${configService.rabbitmqUser}:${configService.rabbitmqPass}@${configService.rabbitmqHost}:${configService.rabbitmqPort}`,
      ],
      queue: USER_ACTIVITY_LOG,
      noAck: true,
      queueOptions: {
        durable: true,
      },
    },
  });

  Logger.log(`${USER_ACTIVITY_LOG} is running on [${configService.nodeEnv}]`);

  await app.startAllMicroservices();
}

void bootstrap();
