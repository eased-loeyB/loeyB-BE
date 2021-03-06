import { LOEYBErrorCode } from '../../../../libs/common/src/constant';
import { LOEYBException } from '../../../../libs/common/src/model';
import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class LOEYBAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    switch (context.getType().toString()) {
      case 'http':
        return context.switchToHttp().getRequest();
      case 'graphql':
        return GqlExecutionContext.create(context).getContext().req;
      default:
        throw new LOEYBException(LOEYBErrorCode.ERROR, 7830);
    }
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status: any,
  ): any {
    if (info instanceof TokenExpiredError) {
      if (context.getType().toString() === 'http') {
        throw new LOEYBException(
          LOEYBErrorCode.INVALID_TOKEN,
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new LOEYBException(LOEYBErrorCode.TOKEN_EXPIRED, 7830);
      }
    }
    if (info instanceof JsonWebTokenError || !user) {
      if (context.getType().toString() === 'http') {
        throw new LOEYBException(
          LOEYBErrorCode.INVALID_TOKEN,
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new LOEYBException(LOEYBErrorCode.INVALID_TOKEN, 7830);
      }
    }
    try {
      return super.handleRequest(err, user, info, context, status);
    } catch (error) {
      Logger.error(error);
      if (context.getType().toString() === 'http') {
        throw new LOEYBException(
          LOEYBErrorCode.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new LOEYBException(LOEYBErrorCode.UNAUTHORIZED, 7829);
      }
    }
  }
}
