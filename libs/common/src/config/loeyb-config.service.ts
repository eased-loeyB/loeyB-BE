import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsEnum } from 'class-validator';
import { LoggerOptions } from 'typeorm';
import { OpUnitType } from 'dayjs';

export enum Environment {
  DEFAULT = '',
  DEVELOPMENT = 'development',
  LOCAL = 'local',
  DOCKER = 'docker',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test',
}
@Injectable()
export class LOEYBConfigService {
  constructor(private readonly configService: ConfigService) {}
  @IsEnum(Environment)
  get nodeEnv(): Environment {
    return this.configService.get<Environment>(
      'NODE_ENV',
      Environment.PRODUCTION,
    );
  }
  get logLevel(): 'debug' | 'info' | 'warn' | 'error' | 'silent' {
    return this.configService.get<
      'debug' | 'info' | 'warn' | 'error' | 'silent'
    >('LOG_LEVEL', 'info');
  }
  get gatewayPort(): number {
    return this.configService.get<number>('GATEWAY_PORT', 3000);
  }
  get dbHost(): string {
    return this.configService.get<string>('DB_HOST', 'localhost');
  }
  get dbPort(): number {
    return this.configService.get<number>('DB_PORT', 5432);
  }
  get dbUsername(): string {
    return this.configService.get<string>('DB_USERNAME', 'postgres');
  }
  get dbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD', 'postgres');
  }
  get dbDatabase(): string {
    return this.configService.get<string>('DB_DATABASE', 'mvp');
  }
  get dbSchema(): string {
    return this.configService.get<string>('DB_SCHEMA', 'public');
  }
  get dbSync(): boolean {
    return this.configService.get<boolean>('DB_SYNC', false);
  }
  get dbDebug(): LoggerOptions {
    return this.configService.get<LoggerOptions>(
      'DB_DEBUG',
      <LoggerOptions>'error',
    );
  }
  get rabbitmqProto(): string {
    return this.configService.get<string>('RABBITMQ_PROTO', 'amqp');
  }
  get rabbitmqHost(): string {
    return this.configService.get<string>('RABBITMQ_HOST', 'localhost');
  }
  get rabbitmqPort(): number {
    return this.configService.get<number>('RABBITMQ_PORT', 5671);
  }
  get rabbitmqUser(): string | undefined {
    return this.configService.get<string | undefined>(
      'RABBITMQ_USER',
      'rabbitmq',
    );
  }
  get rabbitmqPass(): string | undefined {
    return this.configService.get<string | undefined>(
      'RABBITMQ_PASS',
      'loeyb4ever!!',
    );
  }
  get redisHost(): string | undefined {
    return this.configService.get<string>('REDIS_HOST', 'localhost');
  }
  get redisPort(): number {
    return this.configService.get<number>('REDIS_PORT', 6379);
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET', 'loeyb');
  }

  get accessTokenExprieTimeValue(): number {
    return this.configService.get<number>(
      'ACCESS_TOKEN_EXPIRE_TIME_VALUE',
      500,
    );
  }

  get accessTokenExpireTimeUnit(): OpUnitType {
    return this.configService.get<OpUnitType>(
      'ACCESS_TOKEN_EXPIRE_TIME_UNIT',
      'minute',
    );
  }

  get refreshTokenExprieTimeValue(): number {
    return this.configService.get<number>('REFRESH_TOKEN_EXPIRE_TIME_VALUE', 1);
  }

  get refreshTokenExpireTimeUnit(): OpUnitType {
    return this.configService.get<OpUnitType>(
      'REFRESH_TOKEN_EXPIRE_TIME_UNIT',
      <OpUnitType>'month',
    );
  }

  get mandrillAPIKey(): string | undefined {
    return this.configService.get<string | undefined>(
      'MANDRILL_API_KEY',
      undefined,
    );
  }

  get loeybURL(): string {
    return this.configService.get<string>('LOEYB_URL', 'https://loeyb.ai');
  }

  get awsAccessKey(): string {
    return this.configService.get<string>('AWS_ACCESS_KEY_ID');
  }

  get awsSecretAccessKey(): string {
    return this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
  }

  get awsRegion(): string {
    return this.configService.get<string>('AWS_REGION', 'ap-northeast-2');
  }

  get awsS3BucketKey(): string {
    return this.configService.get<string>('AWS_S3_BUCKET_KEY');
  }

  get awsS3BucketAcl(): string {
    return this.configService.get<string>('AWS_S3_BUCKET_ACL', 'public-read');
  }
}
