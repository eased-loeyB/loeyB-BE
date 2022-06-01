import { LOEYBConfigService } from '@libs/common/config/loeyb-config.service';
import { NOTIFICATION } from '../../../libs/common/src/constant';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { NotificationModule } from './notification.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService: LOEYBConfigService =
    app.get<LOEYBConfigService>(LOEYBConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `${configService.rabbitmqProto}://${configService.rabbitmqUser}:${configService.rabbitmqPass}@${configService.rabbitmqHost}:${configService.rabbitmqPort}`,
      ],
      queue: NOTIFICATION,
      noAck: true,
      queueOptions: {
        durable: true,
      },
    },
  });

  Logger.log(`${NOTIFICATION} is running on [${configService.nodeEnv}]`);

  await app.startAllMicroservices();
}
void bootstrap();
