import { registerEnumType } from '@nestjs/graphql';

export enum LOEYBErrorCode {
  SUCCESS = 'SUCCESS',
  NO_USER = 'NO_USER',
  INVALID_TOKEN = 'INVALID_TOKEN',
  UNAUTHORIZED = 'UNAUTHORIZED',

  USER_NOT_FOUND = 'USER_NOT_FOUND',
  PASSWORD_INCORRECT = 'PASSWORD_INCORRECT',
  DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
  QUERY_ERROR = 'QUERY_ERROR',
  ALREADY_REGISTERED_USER = 'ALREADY_REGISTERED_USER',
  ERROR = 'ERROR',
  PARMETER_VALIDATION_ERROR = 'PARMETER_VALIDATION_ERROR',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  CODE_MISMATCH = 'CODE_MISMATCH',

  ALREADY_ADDED_CATEGORIES = 'ALREADY_ADDED_CATEGORIES',
  ALREADY_REGISTERED_IMAGE = 'ALREADY_REGISTERED_IMAGE',
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  SHARP_IMAGE_RESIZE_ERROR = 'SHARP_IMAGE_RESIZE_ERROR',
}

registerEnumType(LOEYBErrorCode, {
  name: 'LOEYBErrorCode',
  description: 'loeyB error code',
  valuesMap: {
    SUCCESS: { description: 'SUCCESS' },
    NO_USER: { description: 'NO_USER' },
    INVALID_TOKEN: { description: 'INVALID_TOKEN' },
    USER_NOT_FOUND: { description: 'USER_NOT_FOUND' },
    UNAUTHORIZED: { description: 'UNAUTHORIZED' },
    PASSWORD_INCORRECT: { description: 'PASSWORD_INCORRECT' },
    DUPLICATE_EMAIL: { description: 'DUPLICATE_EMAIL' },
    QUERY_ERROR: { description: 'QUERY_ERROR' },
    ALREADY_REGISTERED_USER: { description: 'ALREADY_REGISTERED_USER' },
    ERROR: { description: 'ERROR' },
    PARMETER_VALIDATION_ERROR: { description: 'PARMETER_VALIDATION_ERROR' },
    ALREADY_ADDED_CATEGORIES: { description: 'ALREADY_ADDED_CATEGORIES' },
    ALREADY_REGISTERED_IMAGE: { description: 'ALREADY_REGISTERED_IMAGE' },
    FILE_NOT_FOUND: { description: 'FILE_NOT_FOUND' },
    SHARP_IMAGE_RESIZE_ERROR: { description: 'SHARP_IMAGE_RESIZE_ERROR' },
  },
});
