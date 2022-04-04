import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SayHelloOutput } from '../../../../../models';
import {
  RegisterUserInput,
  SayHelloInput,
} from '../../../../../libs/common/src/dto';
import { LOEYBException } from '../../../../../models';
import { LOEYBErrorCode } from '../../../../../libs/common/src/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserOutput } from '@app/common/model';

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

  @Mutation(() => RegisterUserOutput, {
    name: 'registerUser',
    description: '회원가입',
  })
  async registerUser(
    @Args({
      name: 'input',
      description: 'loeyb 회원가입',
      type: () => RegisterUserInput,
    })
    input: RegisterUserInput,
  ): Promise<RegisterUserOutput> {
    try {
      this.logger.debug(input);
      return await this.authenticationService.registerUser(input);
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }
}
