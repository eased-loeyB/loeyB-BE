import { LOEYBErrorCode } from '../../../../libs/common/src/constant';
import { LOEYBException } from '../../../../libs/common/src/model';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): any => {
    switch (context.getType().toString()) {
      case 'http':
        return context.switchToHttp().getRequest().user;
      case 'graphql':
        return GqlExecutionContext.create(context).getContext().req.user;
      default:
        throw new LOEYBException(LOEYBErrorCode.ERROR, 7829);
    }
  },
);
