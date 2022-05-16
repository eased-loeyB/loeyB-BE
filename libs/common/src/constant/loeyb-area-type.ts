import { registerEnumType } from '@nestjs/graphql';

export enum LoeybAreaType {
  HEALTH = 'HEALTH',
  MIND = 'MIND',
  SOCIAL = 'SOCIAL',
  HOBBY = 'HOBBY',
  WORK = 'WORK',
}

registerEnumType(LoeybAreaType, {
  name: 'LoeybAreaType',
  description: 'topic',
  valuesMap: {
    HEALTH: { description: 'HEALTH' },
    MIND: { description: 'MIND' },
    SOCIAL: { description: 'SOCIAL' },
    HOBBY: { description: 'HOBBY' },
    WORK: { description: 'WORK' },
  },
});
