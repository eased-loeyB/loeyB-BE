import { NestFactory } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import { LOEYBConfigService } from '../../../libs/common/src/config/loeyb-config.service';
import { AUTHENTICATION } from '../../../libs/common/src/constant';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AuthenticationModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService: LOEYBConfigService =
    app.get<LOEYBConfigService>(LOEYBConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `${configService.rabbitmqProto}://${configService.rabbitmqUser}:${configService.rabbitmqPass}@${configService.rabbitmqHost}:${configService.rabbitmqPort}`,
      ],
      queue: AUTHENTICATION,
      noAck: true,
      queueOptions: {
        durable: true,
      },
    },
  });

  Logger.log(`${AUTHENTICATION} is running on [${configService.nodeEnv}]`);

  await app.startAllMicroservices();
}

void bootstrap();
