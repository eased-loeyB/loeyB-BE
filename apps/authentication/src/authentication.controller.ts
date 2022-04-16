import { Controller, Logger } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  RegisterUserInput,
  TokenRefreshInput,
} from '../../../libs/common/src/dto';
import {
  AuthenticationOutput,
  RegisterUserOutput,
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
}
