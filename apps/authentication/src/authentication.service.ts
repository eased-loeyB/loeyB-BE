import { Injectable } from '@nestjs/common';
import { LOEYBErrorCode } from '../../../constants';
import { SayHelloInput } from 'dto';
import { SayHelloOutput } from 'models';

@Injectable()
export class AuthenticationService {
  async sayHello(input: SayHelloInput): Promise<string> {
    console.log(input);
    return 'sayHello';
  }
}
