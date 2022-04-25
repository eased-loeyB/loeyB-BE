import { Injectable, Logger, CACHE_MANAGER, Inject } from '@nestjs/common';
import {
  EMAIL_VERIFICATION_CODE_PREFIX,
  Language,
  LOEYBErrorCode,
} from '../../../libs/common/src/constant';
import {
  AuthenticationInput,
  ReCreateAccessTokenInput,
  RegisterUserInput,
  RequestEmailVerificationCodeInput,
  TokenRefreshInput,
  VerifyEmailVerificationCodeInput,
} from '../../../libs/common/src/dto';
import {
  Authentication,
  AuthenticationOutput,
  LOEYBException,
  Output,
  RegisterUserOutput,
  RequestEmailVerificationOutput,
} from '../../../libs/common/src/model';
import { EntityManager } from 'typeorm';
import { LOEYBUserRepository } from '../../../libs/database/src/repositories';
import { LOEYBUserEntity } from '../../../libs/database/src/entities';
import { LOEYBConfigService } from '@libs/common/config/loeyb-config.service';

import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';
import * as dayjs from 'dayjs';
import { Payload } from '../../../libs/common/src/interface';
import { KO_EMAIL_VERIFICATION_SUBJECT } from '@libs/common/email/ko/user/text';
import { koEmailVerificationCodeTemplate } from '@libs/common/email/ko/user/html';
import { enEmailVerificationCodeTemplate } from '@libs/common/email/en/user/html';
import { LOEYBEmailService } from '@libs/common/email/loeyb-email.service';
import * as argon2 from 'argon2';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly configService: LOEYBConfigService,
    private readonly loeybEmailService: LOEYBEmailService,
    private readonly loeybUserRepository: LOEYBUserRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  async registerUser(
    input: RegisterUserInput,
    entityManager: EntityManager,
  ): Promise<RegisterUserOutput> {
    const loeybUserRepository: LOEYBUserRepository =
      entityManager.getCustomRepository<LOEYBUserRepository>(
        LOEYBUserRepository,
      );
    let user: LOEYBUserEntity =
      await loeybUserRepository.findRegisteredUserByEmail(input.email);
    if (user != null) {
      throw new LOEYBException(LOEYBErrorCode.ALREADY_REGISTERED_USER);
    }

    const encryptedPassword = await argon2.hash(input.password);
    user = await loeybUserRepository.save(
      loeybUserRepository.create({
        email: input.email,
        password: encryptedPassword,
      }),
    );

    const now: dayjs.Dayjs = dayjs();
    const exp: dayjs.Dayjs = now.add(
      this.configService.accessTokenExprieTimeValue,
      this.configService.accessTokenExpireTimeUnit,
    );

    return {
      result: LOEYBErrorCode.SUCCESS,
      data: {
        accessToken: await this.createAccessToken(
          user,
          now,
          exp,
          loeybUserRepository,
        ),
        tokenType: 'Bearer',
        expiresIn: exp.unix(),
        refreshToken: await this.createRefreshToken(user, now),
      },
    };
  }

  async refreshAccessToken(
    input: TokenRefreshInput,
    entityManager: EntityManager,
  ): Promise<AuthenticationOutput> {
    const payload: Payload = jwt.verify(
      input.refreshToken,
      this.configService.jwtSecret,
    ) as Payload;
    if (payload.exp < dayjs().unix()) {
      throw new LOEYBException(LOEYBErrorCode.TOKEN_EXPIRED, 7830);
    }

    return this.recreateAccessToken(
      {
        email: payload.aud,
      } as ReCreateAccessTokenInput,
      entityManager,
    );
  }

  async recreateAccessToken(
    input: ReCreateAccessTokenInput,
    entityManager: EntityManager,
  ): Promise<AuthenticationOutput> {
    const loeybUserRepository: LOEYBUserRepository =
      entityManager.getCustomRepository<LOEYBUserRepository>(
        LOEYBUserRepository,
      );

    const user: LOEYBUserEntity =
      await loeybUserRepository.findRegisteredUserByEmail(input.email);
    if (user == null) {
      throw new LOEYBException(LOEYBErrorCode.USER_NOT_FOUND);
    }

    const now = dayjs();
    const exp = now.add(
      this.configService.accessTokenExprieTimeValue,
      this.configService.accessTokenExpireTimeUnit,
    );

    const accessToken: string = await this.createAccessToken(
      user,
      now,
      exp,
      loeybUserRepository,
    );

    const refreshToken: string = await this.createRefreshToken(user, now);

    if (accessToken == null || refreshToken == null) {
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }

    return {
      result: LOEYBErrorCode.SUCCESS,
      data: {
        accessToken: accessToken,
        tokenType: 'Bearer',
        expiresIn: exp.unix(),
        refreshToken: refreshToken,
        redirectUrl: null,
      } as Authentication,
    } as AuthenticationOutput;
  }

  async createAccessToken(
    user: LOEYBUserEntity,
    now: dayjs.Dayjs,
    exp: dayjs.Dayjs,
    loeybUserRepository: LOEYBUserRepository,
  ): Promise<string> {
    await loeybUserRepository.update(
      { id: user.id },
      {
        lastLoginAt: now.toDate(),
        lastLogoutAt: exp.toDate(),
      },
    );

    return jwt.sign(
      {
        iss: 'loeyb.ai',
        sub: 'access',
        iat: now.unix(),
        exp: exp.unix(),
        aud: user.email,
      } as Payload,
      this.configService.jwtSecret,
    );
  }

  async createRefreshToken(
    user: LOEYBUserEntity,
    iat: dayjs.Dayjs,
  ): Promise<string> {
    return jwt.sign(
      {
        iss: 'loeyb.ai',
        sub: 'refresh',
        iat: iat.unix(),
        exp: iat
          .add(
            this.configService.refreshTokenExprieTimeValue,
            this.configService.refreshTokenExpireTimeUnit,
          )
          .unix(),
        aud: user.email,
      } as Payload,
      this.configService.jwtSecret,
    );
  }

  // we need to change it later output

  async requestEmailVerificationCode(
    input: RequestEmailVerificationCodeInput,
    entityManager: EntityManager,
  ): Promise<RequestEmailVerificationOutput> {
    const loeybUserRepository: LOEYBUserRepository =
      entityManager.getCustomRepository<LOEYBUserRepository>(
        LOEYBUserRepository,
      );

    const user = await loeybUserRepository.findRegisteredUserByEmail(
      input.email,
    );
    if (user != null) {
      Logger.warn(JSON.stringify(user));
      throw new LOEYBException(LOEYBErrorCode.DUPLICATE_EMAIL);
    }
    const code = Math.random().toString().split('.')[1].substring(0, 6);
    Logger.debug(code);
    await this.cacheManager.set(
      EMAIL_VERIFICATION_CODE_PREFIX + input.email,
      code,
      {
        ttl: 180,
      },
    );
    const now: dayjs.Dayjs = dayjs();
    const exp: dayjs.Dayjs = now.add(3, 'minute');

    void this.sendEmailVerificationCode(input.language, input.email, code, exp);

    return {
      result: LOEYBErrorCode.SUCCESS,
      data: {
        code: code,
      },
    } as Output;
  }

  async sendEmailVerificationCode(
    language: Language,
    email: string,
    code: string,
    expireTime: dayjs.Dayjs,
  ): Promise<void> {
    let template: string;
    let subject: string;
    const expire = `${expireTime.year()}년 ${
      expireTime.month() + 1
    }월 ${expireTime.date()}일 ${expireTime.hour()}:${expireTime.minute()}`;
    switch (language) {
      case Language.ENGLISH:
        subject = KO_EMAIL_VERIFICATION_SUBJECT;
        template = enEmailVerificationCodeTemplate(
          code,
          this.configService.loeybURL,
        );
        break;
      case Language.KOREAN:
      default:
        subject = KO_EMAIL_VERIFICATION_SUBJECT;
        template = koEmailVerificationCodeTemplate(
          code,
          this.configService.loeybURL,
          expire,
        );
        break;
    }
    await this.loeybEmailService.sendEmail(template, subject, [email]);
  }

  async verifyEmailVerificationCode(
    input: VerifyEmailVerificationCodeInput,
  ): Promise<Output> {
    const code = await this.cacheManager.get(
      EMAIL_VERIFICATION_CODE_PREFIX + input.email,
    );
    if (code != input.code) {
      return {
        result: LOEYBErrorCode.CODE_MISMATCH,
      } as Output;
    }
    return {
      result: LOEYBErrorCode.SUCCESS,
    } as Output;
  }

  async authenticate(
    input: AuthenticationInput,
    entityManager: EntityManager,
  ): Promise<AuthenticationOutput> {
    const loeybUserRepository: LOEYBUserRepository =
      entityManager.getCustomRepository<LOEYBUserRepository>(
        LOEYBUserRepository,
      );
    const user: LOEYBUserEntity =
      await loeybUserRepository.findRegisteredUserByEmail(input.email);
    if (user == null) {
      throw new LOEYBException(LOEYBErrorCode.USER_NOT_FOUND);
    }

    if (!(await argon2.verify(user.password, input.password))) {
      throw new LOEYBException(LOEYBErrorCode.PASSWORD_INCORRECT);
    }

    const now: dayjs.Dayjs = dayjs();
    const exp: dayjs.Dayjs = now.add(
      this.configService.accessTokenExprieTimeValue,
      this.configService.accessTokenExpireTimeUnit,
    );

    return {
      result: LOEYBErrorCode.SUCCESS,
      data: {
        accessToken: await this.createAccessToken(
          user,
          now,
          exp,
          loeybUserRepository,
        ),
        tokenType: 'Bearer',
        expiresIn: exp.unix(),
        refreshToken: await this.createRefreshToken(user, now),
        redirectUrl: null,
      },
    };
  }
}
