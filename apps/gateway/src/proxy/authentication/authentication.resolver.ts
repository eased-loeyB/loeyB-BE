import { Resolver, Query, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SayHelloOutput } from '../../../../../models';
import { SayHelloInput } from '../../../../../dto';
import { LOEYBException } from '../../../../../models';
import { LOEYBErrorCode } from '../../../../../constants';

@Resolver('authentication')
export class AuthenticationResolver {
  private readonly logger: Logger;
  private readonly serviceName: string = 'Authentication';

  constructor(private readonly authenticationService: AuthenticationService) {
    this.logger = new Logger('AuthenticationResolver');
  }

  @Query(() => String, {
    name: 'sayHello',
    description: 'sayHello',
  })
  async sayHello(
    @Args({
      name: 'input',
      description: 'sayHello input',
      type: () => SayHelloInput,
    })
    input: SayHelloInput,
  ): Promise<string> {
    try {
      this.logger.debug(input);
      return await this.authenticationService.sayHello({
        ...input,
      });
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }
}
