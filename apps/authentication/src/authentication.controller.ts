import { Controller, Logger } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AuthenticationInput,
  GoogleLoginInput,
  RegisterUserInput,
  RequestEmailVerificationCodeInput,
  SetUsernameInput,
  TokenRefreshInput,
  VerifyEmailVerificationCodeInput,
} from '../../../libs/common/src/dto';
import {
  AuthenticationOutput,
  LOEYBException,
  Output,
  RegisterUserOutput,
  RequestEmailVerificationOutput,
} from '../../../libs/common/src/model';
import { TransactionBlock } from '../../../libs/common/src/transaction/transaction';
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
  ): Promise<RequestEmailVerificationOutput> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<RequestEmailVerificationOutput> => {
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
  async authenticate(
    @Payload() input: AuthenticationInput,
  ): Promise<AuthenticationOutput> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<AuthenticationOutput> => {
        return await this.authenticationService.authenticate(
          input as AuthenticationInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'googleLogin' })
  async googleLogin(
    @Payload() input: GoogleLoginInput,
  ): Promise<AuthenticationOutput> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<AuthenticationOutput> => {
        return await this.authenticationService.googleLogin(
          input as GoogleLoginInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'setUsername' })
  async setUsername(@Payload() input: SetUsernameInput): Promise<Output> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<Output> => {
        return await this.authenticationService.setUsername(
          input as SetUsernameInput,
          entityManager,
        );
      },
    );
  }
}
