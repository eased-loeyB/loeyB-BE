import { Controller, Logger } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AuthenticationInput,
  RegisterUserInput,
  RequestEmailVerificationCodeInput,
  TokenRefreshInput,
  VerifyEmailVerificationCodeInput,
} from '../../../libs/common/src/dto';
import {
  AuthenticationOutput,
  LOEYBException,
  Output,
  RegisterUserOutput,
} from '../../../libs/common/src/model';
import { TransactionBlock } from '../../../libs/common/src/transaction/transaction';
import { EntityManager } from 'typeorm';
@Controller()
export class AuthenticationController {
  private logger: Logger;
  constructor(private readonly authenticationService: AuthenticationService) {
    this.logger = new Logger('AuthenticationController');
  }

  @MessagePattern({ cmd: 'registerUser' })
  async registerUser(
    @Payload() input: RegisterUserInput,
  ): Promise<RegisterUserOutput> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<RegisterUserOutput> => {
        return await this.authenticationService.registerUser(
          input as RegisterUserInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'refreshAccessToken' })
  async refreshAccessToken(
    @Payload() input: TokenRefreshInput,
  ): Promise<AuthenticationOutput> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<AuthenticationOutput> => {
        return await this.authenticationService.refreshAccessToken(
          input as TokenRefreshInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'requestEmailVerificationCode' })
  async requestEmailVerificationCode(
    @Payload() input: RequestEmailVerificationCodeInput,
  ): Promise<Output> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<Output> => {
        return await this.authenticationService.requestEmailVerificationCode(
          input as RequestEmailVerificationCodeInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'verifyEmailVerificationCode' })
  async verifyEmailVerificationCode(
    @Payload() input: VerifyEmailVerificationCodeInput,
  ): Promise<Output> {
    try {
      return await this.authenticationService.verifyEmailVerificationCode(
        input,
      );
    } catch (error) {
      return LOEYBException.processException(error);
    }
  }

  @MessagePattern({ cmd: 'authentication' })
  async authentication(
    @Payload() input: AuthenticationInput,
  ): Promise<AuthenticationOutput> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<AuthenticationOutput> => {
        return await this.authenticationService.authentication(
          input as AuthenticationInput,
          entityManager,
        );
      },
    );
  }
}
