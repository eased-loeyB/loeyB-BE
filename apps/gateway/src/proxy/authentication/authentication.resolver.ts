import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LOEYBException } from '../../../../../libs/common/src/model';
import { LOEYBErrorCode } from '../../../../../libs/common/src/constant';
import { RegisterUserInput } from '../../../../../libs/common/src/dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserOutput } from '@app/common/model';
@Resolver('authentication')
export class AuthenticationResolver {
  private readonly logger: Logger;
  private readonly serviceName: string = 'Authentication';

  constructor(private readonly authenticationService: AuthenticationService) {
    this.logger = new Logger('AuthenticationResolver');
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
