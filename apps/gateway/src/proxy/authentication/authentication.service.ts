import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LOEYBErrorCode } from '../../../../../constants';
import { SayHelloInput } from '../../../../../dto';
import { LOEYBException, SayHelloOutput } from '../../../../../models';

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
