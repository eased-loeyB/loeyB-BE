import { registerEnumType } from '@nestjs/graphql';

export enum LoeybAreaType {
  HEALTH = 'HEALTH',
  MIND = 'MIND',
  SOCIAL = 'SOCIAL',
  LIFE = 'LIFE',
  WORK = 'WORK',
}

registerEnumType(LoeybAreaType, {
  name: 'LoeybAreaType',
  description: 'topic',
  valuesMap: {
    HEALTH: { description: 'HEALTH' },
    MIND: { description: 'MIND' },
    SOCIAL: { description: 'SOCIAL' },
    LIFE: { description: 'LIFE' },
    WORK: { description: 'WORK' },
  },
});
