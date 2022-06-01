import { LoeybAreaType, LOEYBErrorCode } from '@libs/common/constant';
import {
  addCategoryAndAreaInput,
  addTagInput,
  fetchRegisteredAreaAndCategoryAndTagInput,
  fetchRegisteredCategoryAndTagInput,
  RegisterCategoriesInput,
  RegisterRecordInput,
  SearchTagInput,
} from '@libs/common/dto';
import {
  LOEYBException,
  Output,
  RegisteredAreaAndCategoryAndTag,
  RegisteredAreaAndCategoryAndTagOutput,
  RegisteredCategoryAndTag,
  RegisteredCategoryAndTagOutput,
  RegisteredCategoryAndTagsOutput,
  RegisteredNameAreaAndCategory,
  RegisteredNameAreaAndCategoryOutput,
} from '@libs/common/model';
import {
  LOEYBUserAreaCategoryEntity,
  LOEYBUserCategoryTagEntity,
  LOEYBUserEntity,
  LOEYBUserRecordsEntity,
} from '@libs/database/entities';
import {
  LOEYBUserAreaCategoryRepository,
  LOEYBUserCategoryTagRepository,
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
   * @description: 처음에 회원가입하고, username 작성하고 카테고리 추가할 때 -> area, cateogry 만 추가
   */
  async registerCategories(
    input: RegisterCategoriesInput,
    entityManager: EntityManager,
  ): Promise<Output> {
    const loeybUserAreaCategoryRepository: LOEYBUserAreaCategoryRepository =
      entityManager.getCustomRepository<LOEYBUserAreaCategoryRepository>(
        LOEYBUserAreaCategoryRepository,
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
      await loeybUserAreaCategoryRepository.save(
        loeybUserAreaCategoryRepository.create({
          userId: user.id,
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
    const loeybUserAreaCategoryRepository: LOEYBUserAreaCategoryRepository =
      entityManager.getCustomRepository<LOEYBUserAreaCategoryRepository>(
        LOEYBUserAreaCategoryRepository,
      );

    /**
     * 같은 area에 같은 카테고리 추가 불가
     */
    const userCategory: LOEYBUserAreaCategoryEntity[] =
      await loeybUserAreaCategoryRepository.findRegisteredCategoryAndArea(
        user.id,
        input.category,
        input.area,
      );
    console.log(userCategory.length);
    if (userCategory.length > 0) {
      throw new LOEYBException(LOEYBErrorCode.ALREADY_REGISTERED_CATEGORY);
    }

    const registeredUser =
      await loeybUserAreaCategoryRepository.findRegisteredUser(user.id);
    if (registeredUser == null) {
      throw new LOEYBException(LOEYBErrorCode.NO_USER);
    }

    await loeybUserAreaCategoryRepository.save(
      loeybUserAreaCategoryRepository.create({
        userId: user.id,
        area: input.area,
        category: input.category,
      }),
    );

    return {
      result: LOEYBErrorCode.SUCCESS,
    } as Output;
  }

  /**
   *
   * @param input
   * @param entityManager
   * @returns
   * @description stardust 저장하려고 할때, 원하는 태그가 없으면 추가하는 함수
   */
  async addTag(
    input: addTagInput,
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

    const loeybUserCategoryTagRepository: LOEYBUserCategoryTagRepository =
      entityManager.getCustomRepository<LOEYBUserCategoryTagRepository>(
        LOEYBUserCategoryTagRepository,
      );

    const userTag: LOEYBUserCategoryTagEntity =
      await loeybUserCategoryTagRepository.findOne({
        userId: user.id,
        category: input.category,
        tag: input.tag,
      });
    if (userTag != null) {
      throw new LOEYBException(LOEYBErrorCode.ALREADY_REGISTERED_TAG);
    }

    await loeybUserCategoryTagRepository.save(
      loeybUserCategoryTagRepository.create({
        userId: user.id,
        category: input.category,
        tag: input.tag,
      }),
    );

    return {
      result: LOEYBErrorCode.SUCCESS,
    };
  }

  /**
   *
   * @param input
   * @param entityManager
   * @returns
   * @deprecated()
   */
  /*
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
  */

  /**
   *
   * @param input
   * @param entityManager
   * @returns
   * @description 저장된 area, category, tag 모두 다 보여주는 함수 -> 어디서나 사용가능한 함수임.
   */
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

    const loeybUserAreaCategoryRepository: LOEYBUserAreaCategoryRepository =
      entityManager.getCustomRepository<LOEYBUserAreaCategoryRepository>(
        LOEYBUserAreaCategoryRepository,
      );

    const areaCategory: LOEYBUserAreaCategoryEntity[] =
      await loeybUserAreaCategoryRepository.findRegisteredAreasAndCategories(
        user.id,
      );

    const loeybUserCategoryTagRepository: LOEYBUserCategoryTagRepository =
      entityManager.getCustomRepository<LOEYBUserCategoryTagRepository>(
        LOEYBUserCategoryTagRepository,
      );

    const categoryTag: LOEYBUserCategoryTagEntity[] =
      await loeybUserCategoryTagRepository.findRegisteredCategoriesAndTags(
        user.id,
      );
    /**
     * todo: modifying query result data into object model
     */
    const registeredAreaAndCategoryAndTag: RegisteredAreaAndCategoryAndTag[] =
      [];
    for (const ac of areaCategory) {
      const tagList: string[] = [];
      for (const ct of categoryTag) {
        if (ct.category === ac.category) {
          tagList.push(ct.tag);
        }
      }
      registeredAreaAndCategoryAndTag.push({
        area: ac.area,
        category: ac.category,
        tag: tagList,
      });
    }

    console.log(registeredAreaAndCategoryAndTag);
    return {
      result: LOEYBErrorCode.SUCCESS,
      data: registeredAreaAndCategoryAndTag,
    } as RegisteredAreaAndCategoryAndTagOutput;
  }

  // 이거말고 fetchRegisteredAreaAndCateogryAndTag 사용하면 될 듯
  async fetchRegisteredCategoryAndTag(
    input: fetchRegisteredCategoryAndTagInput,
    entityManager: EntityManager,
  ): Promise<RegisteredCategoryAndTagsOutput> {
    const loeybUserRepository: LOEYBUserRepository =
      entityManager.getCustomRepository<LOEYBUserRepository>(
        LOEYBUserRepository,
      );

    const user: LOEYBUserEntity =
      await loeybUserRepository.findRegisteredUserByEmail(input.email);
    if (user == null) {
      throw new LOEYBException(LOEYBErrorCode.NO_USER);
    }

    const tags = await entityManager.query(
      `select luct.category, luct.tag from loeyb_user_category_tag luct
       where luct.user_id = $1
       limit $2
       offset $3`,
      [user.id, input.limit, input.offset],
    );

    console.log(tags);
    return {
      result: LOEYBErrorCode.SUCCESS,
      data: tags,
    };
  }

  /**
   *
   * @param input
   * @param entityManager
   * @returns
   * @description stardust 저장할 때 tag sheet 에서 search 할 때,
   */
  async searchTag(
    input: SearchTagInput,
    entityManager: EntityManager,
  ): Promise<RegisteredCategoryAndTagOutput> {
    const loeybUserRepository: LOEYBUserRepository =
      entityManager.getCustomRepository<LOEYBUserRepository>(
        LOEYBUserRepository,
      );

    const user: LOEYBUserEntity =
      await loeybUserRepository.findRegisteredUserByEmail(input.email);
    if (user == null) {
      throw new LOEYBException(LOEYBErrorCode.NO_USER);
    }

    const tags = entityManager.query(
      `select luct.category, luct.tag from loeyb_user_category_tag luct 
       where luct.user_id = $1 and luct.tag ilike $2
       limit $3
       offset $4`,
      [user.id, input.keyword, input.limit, input.offset],
    );
    return {
      result: LOEYBErrorCode.SUCCESS,
      data: tags,
    };
  }
}
