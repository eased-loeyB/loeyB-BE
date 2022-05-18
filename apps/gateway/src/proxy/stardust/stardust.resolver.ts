import { LOEYBErrorCode } from '@libs/common/constant';
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
  RegisteredAreaAndCategoryAndTagOutput,
  RegisteredCategoryAndTagOutput,
  RegisteredNameAreaAndCategoryOutput,
} from '@libs/common/model';
import { Logger } from '@nestjs/common';
import { Args, InputType, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StardustService } from './stardust.service';
import { CurrentUser, LoeybAuth } from '../../decorator';

@Resolver('stardust')
export class StardustResolver {
  private readonly logger: Logger;
  private readonly serviceName: string = 'Stardust';

  constructor(private readonly stardustService: StardustService) {
    this.logger = new Logger('StardustResolver');
  }

  @LoeybAuth()
  @Mutation(() => Output, {
    name: 'registerCategories',
    description: 'register at least 3 categories at first',
  })
  async registerCategories(
    @CurrentUser() user: any,
    @Args({
      name: 'input',
      description: 'register at least 3 categories at first',
      type: () => RegisterCategoriesInput,
    })
    input: RegisterCategoriesInput,
  ): Promise<Output> {
    try {
      this.logger.debug(input);
      this.logger.debug(user);
      return await this.stardustService.registerCategories(input);
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }

  @LoeybAuth()
  @Mutation(() => Output, {
    name: 'registerRecord',
    description: 'upload file with tag and date and location information',
  })
  async registerRecord(
    @Args({
      name: 'input',
      description: 'upload file with tag and date and location information',
      type: () => RegisterRecordInput,
    })
    input: RegisterRecordInput,
  ): Promise<Output> {
    try {
      this.logger.debug(input);
      return await this.stardustService.registerRecord(input);
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }

  @LoeybAuth()
  @Mutation(() => Output, {
    name: 'addCategoryAndArea',
    description: 'add categories when upload img file',
  })
  async addCategoryAndArea(
    @CurrentUser() user: any,
    @Args({
      name: 'input',
      description: 'add categories when upload img file',
      type: () => addCategoryAndAreaInput,
    })
    input: addCategoryAndAreaInput,
  ): Promise<Output> {
    try {
      console.log(input);
      this.logger.debug(input);
      this.logger.debug(user);
      return await this.stardustService.addCategoryAndArea(input);
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }

  @LoeybAuth()
  @Mutation(() => Output, {
    name: 'addTag',
    description: 'add categories when upload img file',
  })
  async addTag(
    @CurrentUser() user: any,
    @Args({
      name: 'input',
      description: 'add categories when upload img file',
      type: () => addTagInput,
    })
    input: addTagInput,
  ): Promise<Output> {
    try {
      console.log(input);
      this.logger.debug(input);
      this.logger.debug(user);
      return await this.stardustService.addTag(input);
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }

  @LoeybAuth()
  @Query(() => RegisteredNameAreaAndCategoryOutput, {
    name: 'fetchRegisteredNameAndAreaAndCategory',
    description: 'fetchRegisteredNameAndAreaAndCategory',
  })
  async fetchRegisteredNameAndAreaAndCategory(
    @Args({
      name: 'input',
      description: 'upload file with tag and date and location information',
      type: () => fetchRegisteredAreaAndCategoryAndTagInput,
    })
    input: fetchRegisteredAreaAndCategoryAndTagInput,
  ): Promise<RegisteredNameAreaAndCategoryOutput> {
    try {
      this.logger.debug(input);
      return await this.stardustService.fetchRegisteredNameAndAreaAndCategory(
        input,
      );
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }

  @LoeybAuth()
  @Query(() => RegisteredAreaAndCategoryAndTagOutput, {
    name: 'fetchRegisteredAreaAndCategoryAndTag',
    description: 'fetchRegisteredAreaAndCategoryAndTag',
  })
  async fetchRegisteredAreaAndCategoryAndTag(
    @Args({
      name: 'input',
      description: 'upload file with tag and date and location information',
      type: () => fetchRegisteredAreaAndCategoryAndTagInput,
    })
    input: fetchRegisteredAreaAndCategoryAndTagInput,
  ): Promise<RegisteredAreaAndCategoryAndTagOutput> {
    try {
      this.logger.debug(input);
      return await this.stardustService.fetchRegisteredAreaAndCategoryAndTag(
        input,
      );
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }

  @LoeybAuth()
  @Query(() => RegisteredCategoryAndTagOutput, {
    name: 'fetchRegisteredCategoryAndTag',
    description: 'fetchRegisteredCategoryAndTag',
  })
  async fetchRegisteredCategoryAndTag(
    @Args({
      name: 'input',
      description: 'upload file with tag and date and location information',
      type: () => fetchRegisteredCategoryAndTagInput,
    })
    input: fetchRegisteredCategoryAndTagInput,
  ): Promise<RegisteredCategoryAndTagOutput> {
    try {
      this.logger.debug(input);
      return await this.stardustService.fetchRegisteredCategoryAndTag(input);
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }

  @LoeybAuth()
  @Query(() => RegisteredCategoryAndTagOutput, {
    name: 'searchTag',
    description: 'searchTag',
  })
  async searchTag(
    @Args({
      name: 'input',
      description: 'upload file with tag and date and location information',
      type: () => SearchTagInput,
    })
    input: SearchTagInput,
  ): Promise<RegisteredCategoryAndTagOutput> {
    try {
      this.logger.debug(input);
      return await this.stardustService.searchTag(input);
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }
}
