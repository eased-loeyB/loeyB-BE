import { registerEnumType } from '@nestjs/graphql';

export enum LOEYBErrorCode {
  SUCCESS = 'SUCCESS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  PASSWORD_INCORRECT = 'PASSWORD_INCORRECT',
  DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
  QUERY_ERROR = 'QUERY_ERROR',
  ALREADY_REGISTERED_USER = 'ALREADY_REGISTERED_USER',
  ERROR = 'ERROR',
  PARMETER_VALIDATION_ERROR = 'PARMETER_VALIDATION_ERROR',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
}

registerEnumType(LOEYBErrorCode, {
  name: 'LOEYBErrorCode',
  description: 'loeyB error code',
  valuesMap: {
    SUCCESS: { description: 'SUCCESS' },
    USER_NOT_FOUND: { description: 'USER_NOT_FOUND' },
    PASSWORD_INCORRECT: { description: 'PASSWORD_INCORRECT' },
    DUPLICATE_EMAIL: { description: 'DUPLICATE_EMAIL' },
    QUERY_ERROR: { description: 'QUERY_ERROR' },
    ALREADY_REGISTERED_USER: { description: 'ALREADY_REGISTERED_USER' },
    ERROR: { description: 'ERROR' },
    PARMETER_VALIDATION_ERROR: { description: 'PARMETER_VALIDATION_ERROR' },
  },
});
