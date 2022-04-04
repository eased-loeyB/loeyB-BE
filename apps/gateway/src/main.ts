import { NestFactory } from '@nestjs/core';
import { Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  LOEYBConfigService,
  Environment,
} from '../../../libs/common/src/configs/loeyb-config.service';
import { LOEYBException } from '../../../models';
import { LOEYBErrorCode } from '../../../libs/common/src/constants';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errors
          .map((error) => Object.values(error.constraints))
          .join(',');
        throw new LOEYBException(
          LOEYBErrorCode.PARMETER_VALIDATION_ERROR,
          7829,
          message,
        );
      },
    }),
  );

  const configService: LOEYBConfigService =
    app.get<LOEYBConfigService>(LOEYBConfigService);

  if (configService.nodeEnv !== Environment.PRODUCTION) {
    const config = new DocumentBuilder()
      .setTitle('LOEYB Gateway')
      .setDescription('The LOEYB API description')
      .setVersion('1.0.0')
      .addTag('LOEYB')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'Authorization',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('v1/docs', app, document);
  }

  Logger.log(
    `gateway is running on [${configService.nodeEnv}] ${configService.gatewayPort}`,
  );

  const server = await app.listen(configService.gatewayPort);
  server.setTimeout(1800000);
}

void bootstrap();
