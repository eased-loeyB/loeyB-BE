import { LoeybAreaType, LOEYBErrorCode } from '@libs/common/constant';
import {
  addCategoryAndAreaInput,
  fetchRegisteredAreaAndCategoryAndTagInput,
  RegisterCategoriesInput,
  RegisterRecordInput,
} from '@libs/common/dto';
import {
  LOEYBException,
  Output,
  RegisteredAreaAndCategoryAndTag,
  RegisteredAreaAndCategoryAndTagOutput,
  RegisteredNameAreaAndCategory,
  RegisteredNameAreaAndCategoryOutput,
} from '@libs/common/model';
import {
  LOEYBUserCategoryEntity,
  LOEYBUserEntity,
  LOEYBUserRecordsEntity,
} from '@libs/database/entities';
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
    /**
     * 저장된 area, category 인지 확인하는 로직 필요
     */
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

  /**
   *
   * @param input
   * @param entityManager
   * @returns
   * @description 사진 저장할 때 원하는 카테고리가 없을 경우, 추가하는 api
   */
  async addCategoryAndArea(
    input: addCategoryAndAreaInput,
    entityManager: EntityManager,
  ): Promise<Output> {
    const loeybUserRepository: LOEYBUserRepository =
      entityManager.getCustomRepository<LOEYBUserRepository>(
        LOEYBUserRepository,
      );

    const user: LOEYBUserEntity =
      await loeybUserRepository.findRegisteredUserByEmail(input.email);
    if (user == null) {
      throw new LOEYBException(LOEYBErrorCode.NO_USER);
    }
    const loeybUserCategoryRepository: LOEYBUserCategoryRepository =
      entityManager.getCustomRepository<LOEYBUserCategoryRepository>(
        LOEYBUserCategoryRepository,
      );

    /**
     * 같은 area에 같은 카테고리 추가 불가
     */
    const userCategory: LOEYBUserCategoryEntity[] =
      await loeybUserCategoryRepository.findRegisteredCategoryAndArea(
        user.id,
        input.category,
        input.area,
      );
    console.log(userCategory.length);
    if (userCategory.length > 0) {
      throw new LOEYBException(LOEYBErrorCode.ALREADY_REGISTERED_CATEGORY);
    }

    const registeredUser = await loeybUserCategoryRepository.findRegisteredUser(
      user.id,
    );
    if (registeredUser == null) {
      throw new LOEYBException(LOEYBErrorCode.NO_USER);
    }

    await loeybUserCategoryRepository.save(
      loeybUserCategoryRepository.create({
        userId: user.id,
        name: registeredUser.name,
        area: input.area,
        category: input.category,
      }),
    );

    return {
      result: LOEYBErrorCode.SUCCESS,
    } as Output;
  }

  async fetchRegisteredNameAndAreaAndCategory(
    input: fetchRegisteredAreaAndCategoryAndTagInput,
    entityManager: EntityManager,
  ): Promise<RegisteredNameAreaAndCategoryOutput> {
    const loeybUserRepository: LOEYBUserRepository =
      entityManager.getCustomRepository<LOEYBUserRepository>(
        LOEYBUserRepository,
      );

    const user: LOEYBUserEntity =
      await loeybUserRepository.findRegisteredUserByEmail(input.email);
    if (user == null) {
      throw new LOEYBException(LOEYBErrorCode.NO_USER);
    }

    const loeybUserCategoryRepository: LOEYBUserCategoryRepository =
      entityManager.getCustomRepository<LOEYBUserCategoryRepository>(
        LOEYBUserCategoryRepository,
      );

    const registeredNameAreaCategory: LOEYBUserCategoryEntity[] =
      await loeybUserCategoryRepository.findRegisteredAreasAndCategories(
        user.id,
      );

    const registeredAreaCategory: RegisteredNameAreaAndCategory[] = [];
    for (const r of registeredNameAreaCategory) {
      registeredAreaCategory.push({
        name: r.name,
        area: <LoeybAreaType>r.area,
        category: r.category,
      });
    }

    return {
      result: LOEYBErrorCode.SUCCESS,
      data: registeredAreaCategory,
    } as RegisteredNameAreaAndCategoryOutput;
  }

  async fetchRegisteredAreaAndCategoryAndTag(
    input: fetchRegisteredAreaAndCategoryAndTagInput,
    entityManager: EntityManager,
  ): Promise<RegisteredAreaAndCategoryAndTagOutput> {
    const loeybUserRepository: LOEYBUserRepository =
      entityManager.getCustomRepository<LOEYBUserRepository>(
        LOEYBUserRepository,
      );

    const user: LOEYBUserEntity =
      await loeybUserRepository.findRegisteredUserByEmail(input.email);
    if (user == null) {
      throw new LOEYBException(LOEYBErrorCode.NO_USER);
    }

    const loeybUserRecordsRepository: LOEYBUserRecordsRepository =
      entityManager.getCustomRepository<LOEYBUserRecordsRepository>(
        LOEYBUserRecordsRepository,
      );

    const result = await loeybUserRecordsRepository.findAllTag(user.id);
    const registeredAreaAndCategory: RegisteredAreaAndCategoryAndTag[] = [];

    for (const r of result) {
      registeredAreaAndCategory.push({
        area: r.area,
        category: r.category,
        tag: r.tag,
      });
    }

    return {
      result: LOEYBErrorCode.SUCCESS,
      data: registeredAreaAndCategory,
    } as RegisteredAreaAndCategoryAndTagOutput;
  }
}
