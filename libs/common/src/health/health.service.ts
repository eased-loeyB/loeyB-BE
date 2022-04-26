import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HealthCheckResult } from '@nestjs/terminus';
import { timeout } from 'rxjs/operators';

@Injectable()
export class HealthService {
  private readonly logger: Logger;

  constructor(
    @Inject('AUTHENTICATION_SERVICE')
    private readonly authentication: ClientProxy,
    @Inject('FILE_SERVICE') private readonly file: ClientProxy,
    @Inject('STARDUST_SERVICE') private readonly stardust: ClientProxy,
  ) {
    this.logger = new Logger('HealthService');
  }

  async isAuthenticationHealty(): Promise<HealthCheckResult> {
    try {
      return await this.authentication
        .send<HealthCheckResult, string>({ cmd: 'ping' }, 'authentication')
        .pipe(timeout(3000))
        .toPromise();
    } catch (error) {
      this.logger.error(error);
      return { status: 'error' } as HealthCheckResult;
    }
  }

  async isFileHealty(): Promise<HealthCheckResult> {
    try {
      return await this.file
        .send<HealthCheckResult, string>({ cmd: 'ping' }, 'file')
        .pipe(timeout(3000))
        .toPromise();
    } catch (error) {
      this.logger.error(error);
      return { status: 'error' } as HealthCheckResult;
    }
  }

  async isStardustHealty(): Promise<HealthCheckResult> {
    try {
      return await this.stardust
        .send<HealthCheckResult, string>({ cmd: 'ping' }, 'file')
        .pipe(timeout(3000))
        .toPromise();
    } catch (error) {
      this.logger.error(error);
      return { status: 'error' } as HealthCheckResult;
    }
  }
}
