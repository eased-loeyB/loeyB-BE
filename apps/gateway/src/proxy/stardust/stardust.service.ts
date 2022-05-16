import { LOEYBErrorCode } from '@libs/common/constant';
import {
  addCategoryAndAreaInput,
  fetchRegisteredAreaAndCategoryAndTagInput,
  RegisterCategoriesInput,
  RegisterRecordInput,
} from '@libs/common/dto';
import {
  LOEYBException,
  Output,
  RegisteredAreaAndCategoryAndTagOutput,
  RegisteredNameAreaAndCategoryOutput,
} from '@libs/common/model';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class StardustService {
  private readonly logger: Logger;

  constructor(@Inject('STARDUST_SERVICE') private client: ClientProxy) {
    this.logger = new Logger('StardustService');
  }

  async registerCategories(input: RegisterCategoriesInput): Promise<Output> {
    try {
      return await this.client
        .send<Output, RegisterCategoriesInput>(
          { cmd: 'registerCategories' },
          input,
        )
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
  }

  async registerRecord(input: RegisterRecordInput): Promise<Output> {
    try {
      return await this.client
        .send<Output, RegisterRecordInput>({ cmd: 'registerRecord' }, input)
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
  }

  async addCategoryAndArea(input: addCategoryAndAreaInput): Promise<Output> {
    try {
      return await this.client
        .send<Output, addCategoryAndAreaInput>(
          { cmd: 'addCategoryAndArea' },
          input,
        )
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
  }

  async fetchRegisteredNameAndAreaAndCategory(
    input: fetchRegisteredAreaAndCategoryAndTagInput,
  ): Promise<RegisteredNameAreaAndCategoryOutput> {
    try {
      return await this.client
        .send<
          RegisteredNameAreaAndCategoryOutput,
          fetchRegisteredAreaAndCategoryAndTagInput
        >({ cmd: 'fetchRegisteredNameAndAreaAndCategory' }, input)
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
  }

  async fetchRegisteredAreaAndCategoryAndTag(
    input: fetchRegisteredAreaAndCategoryAndTagInput,
  ): Promise<RegisteredAreaAndCategoryAndTagOutput> {
    try {
      return await this.client
        .send<
          RegisteredAreaAndCategoryAndTagOutput,
          fetchRegisteredAreaAndCategoryAndTagInput
        >({ cmd: 'fetchRegisteredAreaAndCategoryAndTag' }, input)
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
  }
}
