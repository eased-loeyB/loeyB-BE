import { Injectable } from '@nestjs/common';
import { LOEYBErrorCode } from '../../../libs/common/src/constant';
import { SayHelloInput } from '../../../libs/common/src/dto';
import { SayHelloOutput } from '../../../libs/common/src/model';

@Injectable()
export class AuthenticationService {
  async sayHello(input: SayHelloInput): Promise<string> {
    console.log(input);
    return 'sayHello';
  }
}
