import { LOEYBErrorCode } from '@libs/common/constant';
import { RegisterCategoriesInput } from '@libs/common/dto';
import { LOEYBException, Output } from '@libs/common/model';
import { LOEYBUserEntity } from '@libs/database/entities';
import {
  LOEYBUserCategoryRepository,
  LOEYBUserRepository,
} from '@libs/database/repositories';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class StardustService {
  /**
   *
   * @param input RegisterCategoriesInput
   * @param entityManager
   * @returns Output
   * @description: first time for adding categories and name
   */
  async registerCategories(
    input: RegisterCategoriesInput,
    entityManager: EntityManager,
  ): Promise<Output> {
    const loeybUserCategoryRepository: LOEYBUserCategoryRepository =
      entityManager.getCustomRepository<LOEYBUserCategoryRepository>(
        LOEYBUserCategoryRepository,
      );
    const loeybUserRepository: LOEYBUserRepository =
      entityManager.getCustomRepository<LOEYBUserRepository>(
        LOEYBUserRepository,
      );
    const user: LOEYBUserEntity =
      await loeybUserRepository.findRegisteredUserByEmail(input.email);
    if (user == null) {
      throw new LOEYBException(LOEYBErrorCode.NO_USER);
    }

    for (const c of input.category) {
      await loeybUserCategoryRepository.save(
        loeybUserCategoryRepository.create({
          userId: user.id,
          name: input.name,
          category: c,
        }),
      );
    }

    return {
      result: LOEYBErrorCode.SUCCESS,
    } as Output;
  }
}
