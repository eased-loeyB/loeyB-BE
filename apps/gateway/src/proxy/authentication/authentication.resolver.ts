import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
  AuthenticationOutput,
  LOEYBException,
  Output,
  RequestEmailVerificationOutput,
} from '../../../../../libs/common/src/model';
import { LOEYBErrorCode } from '../../../../../libs/common/src/constant';
import {
  AuthenticationInput,
  GoogleLoginInput,
  RegisterUserInput,
  RequestEmailVerificationCodeInput,
  SetUsernameInput,
  TokenRefreshInput,
  VerifyEmailVerificationCodeInput,
} from '../../../../../libs/common/src/dto';
import { RegisterUserOutput } from '../../../../../libs/common/src/model';
import { CurrentUser, LoeybAuth } from '../../decorator';
@Resolver('authentication')
export class AuthenticationResolver {
  private readonly logger: Logger;
  private readonly serviceName: string = 'Authentication';

  constructor(private readonly authenticationService: AuthenticationService) {
    this.logger = new Logger('AuthenticationResolver');
  }

  @LoeybAuth()
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
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

  @Mutation(() => AuthenticationOutput, {
    name: 'refresh',
    description: 'Authorization: Bearer 토큰 갱신',
  })
  async refresh(
    @Args({
      name: 'input',
      description: '토큰 갱신',
      type: () => TokenRefreshInput,
    })
    input: TokenRefreshInput,
  ): Promise<AuthenticationOutput> {
    try {
      this.logger.debug(input);
      return await this.authenticationService.refreshAccessToken({
        ...input,
      });
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }

  @Mutation(() => RequestEmailVerificationOutput, {
    name: 'requestEmailVerificationCode',
    description: '이메일 인증 요청',
  })
  async requestEmailVerificationCode(
    @Args({
      name: 'input',
      description: '이메일 인증 코드',
      type: () => RequestEmailVerificationCodeInput,
    })
    input: RequestEmailVerificationCodeInput,
  ): Promise<RequestEmailVerificationOutput> {
    try {
      this.logger.debug(input);
      return await this.authenticationService.requestEmailVerificationCode({
        ...input,
      });
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }

  @Query(() => Output, {
    name: 'verifyEmailVerificationCode',
    description: '이메일 인증 확인',
  })
  async verifyEmailVerificationCode(
    @Args({
      name: 'input',
      description: '이메일 인증',
      type: () => VerifyEmailVerificationCodeInput,
    })
    input: VerifyEmailVerificationCodeInput,
  ): Promise<Output> {
    try {
      this.logger.debug(input);
      return await this.authenticationService.verifyEmailVerificationCode({
        ...input,
      });
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }

  @Query(() => AuthenticationOutput, {
    name: 'authenticate',
    description: '로그인',
  })
  async authenticate(
    @Args({
      name: 'input',
      description: '로그인',
      type: () => AuthenticationInput,
    })
    input: AuthenticationInput,
  ): Promise<AuthenticationOutput> {
    try {
      this.logger.debug(input);
      return await this.authenticationService.authenticate({
        ...input,
      });
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }

  @Mutation(() => AuthenticationOutput, {
    name: '',
    description: '이메일 인증 요청',
  })
  async googleLogin(
    @Args({
      name: 'input',
      description: '이메일 인증 코드',
      type: () => GoogleLoginInput,
    })
    input: GoogleLoginInput,
  ): Promise<AuthenticationOutput> {
    try {
      this.logger.debug(input);
      return await this.authenticationService.googleLogin({
        ...input,
      });
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }

  @LoeybAuth()
  @Mutation(() => Output, {
    name: '',
    description: '이메일 인증 요청',
  })
  async setUsername(
    @CurrentUser() user: any,
    @Args({
      name: 'input',
      description: '이메일 인증 코드',
      type: () => SetUsernameInput,
    })
    input: SetUsernameInput,
  ): Promise<Output> {
    try {
      this.logger.debug(input);
      return await this.authenticationService.setUsername({
        ...input,
        email: user.email,
      });
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }
}
