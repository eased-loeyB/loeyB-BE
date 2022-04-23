import { LOEYBErrorCode } from '@libs/common/constant';
import { RegisterCategoriesInput, RegisterRecordInput } from '@libs/common/dto';
import { LOEYBException, Output } from '@libs/common/model';
import { LOEYBUserEntity } from '@libs/database/entities';
import {
  LOEYBUserCategoryRepository,
  LOEYBUserRecordsRepository,
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

    for (const c of input.areaCategory) {
      await loeybUserCategoryRepository.save(
        loeybUserCategoryRepository.create({
          userId: user.id,
          name: input.name,
          area: c.area,
          category: c.category,
        }),
      );
    }

    return {
      result: LOEYBErrorCode.SUCCESS,
    } as Output;
  }

  async registerRecord(
    input: RegisterRecordInput,
    entityManager: EntityManager,
  ): Promise<Output> {
    const loeybUserRepository: LOEYBUserRepository =
      entityManager.getCustomRepository<LOEYBUserRepository>(
        LOEYBUserRepository,
      );
    const loeybUserRecordsRepository: LOEYBUserRecordsRepository =
      entityManager.getCustomRepository<LOEYBUserRecordsRepository>(
        LOEYBUserRecordsRepository,
      );
    const user: LOEYBUserEntity =
      await loeybUserRepository.findRegisteredUserByEmail(input.email);
    if (user == null) {
      throw new LOEYBException(LOEYBErrorCode.NO_USER);
    }

    const alreadyImgFile = await loeybUserRecordsRepository.findOne({
      fildId: input.imgFiles.fileId,
    });
    if (alreadyImgFile != null) {
      throw new LOEYBException(LOEYBErrorCode.ALREADY_REGISTERED_IMAGE);
    }
    for (const a of input.areaCategoryTag) {
      await loeybUserRecordsRepository.save(
        loeybUserRecordsRepository.create({
          userId: user.id,
          fildId: input.imgFiles.fileId,
          fildName: input.imgFiles.fileName,
          area: a.area,
          category: a.category,
          tag: a.tag,
          date: input.date,
          location: input.location,
        }),
      );
    }
    return {
      result: LOEYBErrorCode.SUCCESS,
    } as Output;
  }
}
