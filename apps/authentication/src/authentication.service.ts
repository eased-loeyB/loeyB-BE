import { Injectable } from '@nestjs/common';
import { LOEYBErrorCode } from '../../../libs/common/src/constant';
import {
  ReCreateAccessTokenInput,
  RegisterUserInput,
  TokenRefreshInput,
} from '../../../libs/common/src/dto';
import {
  Authentication,
  AuthenticationOutput,
  LOEYBException,
  RegisterUserOutput,
} from '../../../libs/common/src/model';
import { EntityManager } from 'typeorm';
import { LOEYBUserRepository } from '../../../libs/database/src/repositories';
import { LOEYBUserEntity } from '../../../libs/database/src/entities';
import { LOEYBConfigService } from '@libs/common/config/loeyb-config.service';

import * as jwt from 'jsonwebtoken';
import * as dayjs from 'dayjs';
import { Payload } from '../../../libs/common/src/interface';

@Injectable()
export class AuthenticationService {
  constructor(private readonly configService: LOEYBConfigService) {}
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

    user = await loeybUserRepository.save(
      loeybUserRepository.create({
        email: input.email,
        password: input.password,
      }),
    );

    return {
      result: LOEYBErrorCode.SUCCESS,
      data: 'succes',
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
}
