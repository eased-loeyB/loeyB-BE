import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LOEYBErrorCode } from '../../../../../libs/common/src/constant';
import {
  AuthenticationOutput,
  LOEYBException,
  Output,
  RegisterUserOutput,
} from '../../../../../libs/common/src/model';
import {
  RegisterUserInput,
  RequestEmailVerificationCodeInput,
  TokenRefreshInput,
  VerifyEmailVerificationCodeInput,
} from '../../../../../libs/common/src/dto';

@Injectable()
export class AuthenticationService {
  private readonly logger: Logger;

  constructor(@Inject('AUTHENTICATION_SERVICE') private client: ClientProxy) {
    this.logger = new Logger('AuthenticationService');
  }

  async registerUser(input: RegisterUserInput): Promise<RegisterUserOutput> {
    try {
      return await this.client
        .send<RegisterUserOutput, RegisterUserInput>(
          { cmd: 'registerUser' },
          input,
        )
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
  }

  async refreshAccessToken(
    input: TokenRefreshInput,
  ): Promise<AuthenticationOutput> {
    try {
      return await this.client
        .send<AuthenticationOutput, TokenRefreshInput>(
          { cmd: 'refreshAccessToken' },
          input,
        )
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
  }

  async requestEmailVerificationCode(
    input: RequestEmailVerificationCodeInput,
  ): Promise<Output> {
    try {
      return await this.client
        .send<Output, RequestEmailVerificationCodeInput>(
          { cmd: 'requestEmailVerificationCode' },
          input,
        )
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(LOEYBErrorCode.ERROR, 7829, error.message);
    }
  }

  async verifyEmailVerificationCode(
    input: VerifyEmailVerificationCodeInput,
  ): Promise<Output> {
    try {
      return await this.client
        .send<Output, VerifyEmailVerificationCodeInput>(
          { cmd: 'verifyEmailVerificationCode' },
          input,
        )
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(LOEYBErrorCode.ERROR, 7829, error.message);
    }
  }
}
