import { RegisterUserOutput } from '@app/common/model';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LOEYBErrorCode } from '../../../../../libs/common/src/constants';
import {
  RegisterUserInput,
  SayHelloInput,
} from '../../../../../libs/common/src/dto';
import { LOEYBException } from '../../../../../models';

@Injectable()
export class AuthenticationService {
  private readonly logger: Logger;

  constructor(@Inject('AUTHENTICATION_SERVICE') private client: ClientProxy) {
    this.logger = new Logger('AuthenticationService');
  }

  async sayHello(input: SayHelloInput): Promise<string> {
    try {
      return await this.client
        .send<string, SayHelloInput>({ cmd: 'sayHello' }, input)
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
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
