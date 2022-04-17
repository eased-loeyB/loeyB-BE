import { registerEnumType } from '@nestjs/graphql';

export enum Language {
  KOREAN = 'ko',
  ENGLISH = 'en',
}

registerEnumType(Language, {
  name: 'Language',
  description: '유저들의 국가',
  valuesMap: {
    KOREAN: { description: '한국' },
  },
});
