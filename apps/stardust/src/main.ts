import { LOEYBConfigService } from '@libs/common/config/loeyb-config.service';
import { STARDUST } from '@libs/common/constant';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { StardustModule } from './stardust.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(StardustModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService: LOEYBConfigService =
    app.get<LOEYBConfigService>(LOEYBConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `${configService.rabbitmqProto}://${configService.rabbitmqUser}:${configService.rabbitmqPass}@${configService.rabbitmqHost}:${configService.rabbitmqPort}`,
      ],
      queue: STARDUST,
      noAck: true,
      queueOptions: {
        durable: true,
      },
    },
  });

  Logger.log(`${STARDUST} is running on [${configService.nodeEnv}]`);

  await app.startAllMicroservicesAsync();
}

void bootstrap();
