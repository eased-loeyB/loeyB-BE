import { LOEYBErrorCode } from '@libs/common/constant';
import { UserActivityLogInput } from '@libs/common/dto';
import { LOEYBException, Output } from '@libs/common/model';
import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserActivityLogProxyService } from './user-activity-log.proxy.service';

@Resolver('userActivityLog')
export class UserActivityLogResolver {
  private readonly logger: Logger;
  private readonly serviceName: string = 'UserActivityLog';

  constructor(
    private readonly userActivityLogService: UserActivityLogProxyService,
  ) {
    this.logger = new Logger('UserActivityLogResolver');
  }

  @Mutation(() => Output, {
    name: 'writeUserActivityLog',
    description: '사용자 활동 로그 입력 완료',
  })
  async writeUserActivityLog(
    @Args({ name: 'input', description: '사용자 활동 로그 입력' })
    input: UserActivityLogInput,
  ): Promise<Output> {
    try {
      this.logger.debug(input);
      void this.userActivityLogService.writeUserActivityLog({
        ...input,
      });

      return {
        result: LOEYBErrorCode.SUCCESS,
      } as Output;
    } catch (error) {
      this.logger.error(error);
      throw new LOEYBException(LOEYBErrorCode.ERROR);
    }
  }
}
