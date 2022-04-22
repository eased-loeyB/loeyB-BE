import { LOEYBErrorCode } from '@libs/common/constant';
import { RegisterCategoriesInput } from '@libs/common/dto';
import { LOEYBException, Output } from '@libs/common/model';
import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StardustService } from './stardust.service';

@Resolver()
export class StardustResolver {
  private readonly logger: Logger;
  constructor(private readonly stardustService: StardustService) {
    this.logger = new Logger('AuthenticationResolver');
  }
  @Mutation(() => Output, {
    name: 'registerCategories',
    description: 'register at least 3 categories at first',
  })
  async registerCategories(
    @Args({
      name: 'input',
      description: 'register at least 3 categories at first',
      type: () => RegisterCategoriesInput,
    })
    input: RegisterCategoriesInput,
  ): Promise<Output> {
    try {
      this.logger.debug(input);
      return await this.stardustService.registerCategories(input);
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }
}
