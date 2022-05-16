import {
  addCategoryAndAreaInput,
  fetchRegisteredAreaAndCategoryAndTagInput,
  RegisterCategoriesInput,
  RegisterRecordInput,
} from '@libs/common/dto';
import {
  Output,
  RegisteredAreaAndCategoryAndTagOutput,
  RegisteredNameAreaAndCategoryOutput,
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

  @MessagePattern({ cmd: 'fetchRegisteredNameAndAreaAndCategory' })
  async fetchRegisteredNameAndAreaAndCategory(
    @Payload() input: fetchRegisteredAreaAndCategoryAndTagInput,
  ): Promise<RegisteredNameAreaAndCategoryOutput> {
    return await TransactionBlock(
      input,
      async (
        input,
        entityManager,
      ): Promise<RegisteredNameAreaAndCategoryOutput> => {
        return await this.stardustService.fetchRegisteredNameAndAreaAndCategory(
          input as fetchRegisteredAreaAndCategoryAndTagInput,
          entityManager,
        );
      },
    );
  }

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
}
