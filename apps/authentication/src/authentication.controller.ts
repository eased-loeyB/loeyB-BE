import { Controller, Logger } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SayHelloInput } from '../../../dto';
import { SayHelloOutput, LOEYBException } from '../../../models';
@Controller()
export class AuthenticationController {
  private logger: Logger;
  constructor(private readonly authenticationService: AuthenticationService) {
    this.logger = new Logger('AuthenticationController');
  }

  @MessagePattern({ cmd: 'sayHello' })
  async sayHello(@Payload() input: SayHelloInput): Promise<string> {
    try {
      return await this.authenticationService.sayHello(input);
    } catch (error) {
      return 'LOEYBException.processException(error)';
    }
  }
}
