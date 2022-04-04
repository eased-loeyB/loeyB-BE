import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LOEYBErrorCode } from '../../../../../libs/common/src/constant';
import { SayHelloInput } from '../../../../../libs/common/src/dto';
import {
  LOEYBException,
  SayHelloOutput,
} from '../../../../../libs/common/src/model';

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
      throw new LOEYBException(LOEYBErrorCode.ERROR, 7829, error.message);
    }
  }
}
