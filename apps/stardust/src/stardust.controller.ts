import { RegisterCategoriesInput } from '@libs/common/dto';
import { Output } from '@libs/common/model';
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
    console.log(input);

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
}
