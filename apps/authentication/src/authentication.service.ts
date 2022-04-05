import { Injectable } from '@nestjs/common';
import { LOEYBErrorCode } from '../../../libs/common/src/constant';
import { RegisterUserInput } from '../../../libs/common/src/dto';
import {
  LOEYBException,
  RegisterUserOutput,
} from '../../../libs/common/src/model';
import { EntityManager } from 'typeorm';
import { LOEYBUserRepository } from '../../../libs/database/src/repositories';
import { LOEYBUserEntity } from '../../../libs/database/src/entities';

@Injectable()
export class AuthenticationService {
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

    console.log(user);
    return {
      result: LOEYBErrorCode.SUCCESS,
      data: 'succes',
    };
  }
}
