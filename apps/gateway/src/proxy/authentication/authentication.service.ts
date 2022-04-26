import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LOEYBErrorCode } from '../../../../../libs/common/src/constant';
import {
  AuthenticationOutput,
  LOEYBException,
  Output,
  RegisterUserOutput,
  RequestEmailVerification,
  RequestEmailVerificationOutput,
} from '../../../../../libs/common/src/model';
import {
  AuthenticationInput,
  RegisterUserInput,
  RequestEmailVerificationCodeInput,
  SetUsernameInput,
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
  ): Promise<RequestEmailVerificationOutput> {
    try {
      return await this.client
        .send<
          RequestEmailVerificationOutput,
          RequestEmailVerificationCodeInput
        >({ cmd: 'requestEmailVerificationCode' }, input)
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
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
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
  }

  async authenticate(
    input: AuthenticationInput,
  ): Promise<AuthenticationOutput> {
    try {
      return await this.client
        .send<AuthenticationOutput, AuthenticationInput>(
          { cmd: 'authentication' },
          input,
        )
        .toPromise();
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
  }

  async setUsername(input: SetUsernameInput): Promise<Output> {
    try {
      return await this.client
        .send<Output, SetUsernameInput>({ cmd: 'setUsername' }, input)
        .toPromise();
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
  }
}
