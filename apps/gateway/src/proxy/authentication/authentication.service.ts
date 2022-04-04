import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LOEYBErrorCode } from '../../../../../libs/common/src/constant';
import {
  LOEYBException,
  RegisterUserOutput,
} from '../../../../../libs/common/src/model';
import { RegisterUserInput } from '../../../../../libs/common/src/dto';

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
}
