import { Injectable } from '@nestjs/common';
import { LOEYBErrorCode } from '../../../libs/common/src/constants';
import { RegisterUserInput, SayHelloInput } from '@app/common/dto';
import { LOEYBException, SayHelloOutput } from 'models';
import { RegisterUserOutput } from '@app/common/model';
import { EntityManager } from 'typeorm';
import { LOEYBUserRepository } from '@app/database/respositories/loeyb-user.repository';
import { LOEYBUserEntity } from '@app/database/entities';

@Injectable()
export class AuthenticationService {
  async sayHello(input: SayHelloInput): Promise<string> {
    console.log(input);
    return 'sayHello';
  }

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
