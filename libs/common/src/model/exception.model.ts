import { LOEYBErrorCode } from '../constant';
import { Output } from '.';
import { HttpException, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export class LOEYBException extends HttpException {
  errorMessage?: string | null;

  constructor(
    public code: LOEYBErrorCode,
    public statusCode: number = 7829,
    errorMessage?: string | null,
  ) {
    super(code, statusCode);
    this.errorMessage = errorMessage;
  }

  static processException(error: any): Output {
    Logger.debug(error.stack);
    if (error instanceof LOEYBException) {
      return {
        result: <LOEYBErrorCode>error.message,
        errorMessage: error.errorMessage,
      } as Output;
    } else if (error instanceof QueryFailedError) {
      return {
        result: LOEYBErrorCode.QUERY_ERROR,
        errorMessage: error.message,
      } as Output;
    } else {
      return {
        result: LOEYBErrorCode.ERROR,
        errorMessage: error.message,
      } as Output;
    }
  }
}
