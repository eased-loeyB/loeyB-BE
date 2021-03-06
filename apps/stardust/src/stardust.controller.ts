import {
  addCategoryAndAreaInput,
  addTagInput,
  fetchTagRatioInput,
  fetchRegisteredAreaAndCategoryAndTagInput,
  fetchRegisteredCategoryAndTagInput,
  FetchRegisteredRecordsInput,
  RegisterCategoriesInput,
  RegisterRecordInput,
  SearchTagInput,
  UpdateRecordInput,
} from '@libs/common/dto';
import {
  areaTagRatiosOutput,
  Output,
  RegisteredAreaAndCategoryAndTagOutput,
  RegisteredCategoryAndTagOutput,
  RegisteredCategoryAndTagsOutput,
  RegisteredNameAreaAndCategoryOutput,
  StardustRecordsOutput,
} from '@libs/common/model';
import { TransactionBlock } from '@libs/common/transaction/transaction';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StardustService } from './stardust.service';

@Controller()
export class StardustController {
  private logger: Logger;
  constructor(private readonly stardustService: StardustService) {
    this.logger = new Logger('StardustController');
  }

  @MessagePattern({ cmd: 'registerCategories' })
  async registerCategories(
    @Payload() input: RegisterCategoriesInput,
  ): Promise<Output> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<Output> => {
        return await this.stardustService.registerCategories(
          input as RegisterCategoriesInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'registerRecord' })
  async registerRecord(@Payload() input: RegisterRecordInput): Promise<Output> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<Output> => {
        return await this.stardustService.registerRecord(
          input as RegisterRecordInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'updateRecord' })
  async updateRecord(@Payload() input: UpdateRecordInput): Promise<Output> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<Output> => {
        return await this.stardustService.updateRecord(
          input as UpdateRecordInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'addCategoryAndArea' })
  async addCategoryAndArea(
    @Payload() input: addCategoryAndAreaInput,
  ): Promise<Output> {
    console.log(input);
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<Output> => {
        return await this.stardustService.addCategoryAndArea(
          input as addCategoryAndAreaInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'addTag' })
  async addTag(@Payload() input: addTagInput): Promise<Output> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<Output> => {
        return await this.stardustService.addTag(
          input as addTagInput,
          entityManager,
        );
      },
    );
  }

  // @MessagePattern({ cmd: 'fetchRegisteredNameAndAreaAndCategory' })
  // async fetchRegisteredNameAndAreaAndCategory(
  //   @Payload() input: fetchRegisteredAreaAndCategoryAndTagInput,
  // ): Promise<RegisteredNameAreaAndCategoryOutput> {
  //   return await TransactionBlock(
  //     input,
  //     async (
  //       input,
  //       entityManager,
  //     ): Promise<RegisteredNameAreaAndCategoryOutput> => {
  //       return await this.stardustService.fetchRegisteredNameAndAreaAndCategory(
  //         input as fetchRegisteredAreaAndCategoryAndTagInput,
  //         entityManager,
  //       );
  //     },
  //   );
  // }

  @MessagePattern({ cmd: 'fetchRegisteredAreaAndCategoryAndTag' })
  async fetchRegisteredAreaAndCategoryAndTag(
    @Payload() input: fetchRegisteredAreaAndCategoryAndTagInput,
  ): Promise<RegisteredAreaAndCategoryAndTagOutput> {
    return await TransactionBlock(
      input,
      async (
        input,
        entityManager,
      ): Promise<RegisteredAreaAndCategoryAndTagOutput> => {
        return await this.stardustService.fetchRegisteredAreaAndCategoryAndTag(
          input as fetchRegisteredAreaAndCategoryAndTagInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'fetchRegisteredCategoryAndTag' })
  async fetchRegisteredCategoryAndTag(
    @Payload() input: fetchRegisteredCategoryAndTagInput,
  ): Promise<RegisteredCategoryAndTagsOutput> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<RegisteredCategoryAndTagOutput> => {
        return await this.stardustService.fetchRegisteredCategoryAndTag(
          input as fetchRegisteredCategoryAndTagInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'searchTag' })
  async searchTag(
    @Payload() input: SearchTagInput,
  ): Promise<RegisteredCategoryAndTagOutput> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<RegisteredCategoryAndTagOutput> => {
        return await this.stardustService.searchTag(
          input as SearchTagInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'fetchRegisteredRecords' })
  async fetchRegisteredRecords(
    @Payload() input: FetchRegisteredRecordsInput,
  ): Promise<StardustRecordsOutput> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<StardustRecordsOutput> => {
        return await this.stardustService.fetchRegisteredRecords(
          input as FetchRegisteredRecordsInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'fetchTagRatio' })
  async fetchTagRatio(
    @Payload() input: fetchTagRatioInput,
  ): Promise<areaTagRatiosOutput> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<areaTagRatiosOutput> => {
        return await this.stardustService.fetchTagRatio(
          input as fetchTagRatioInput,
          entityManager,
        );
      },
    );
  }
}
