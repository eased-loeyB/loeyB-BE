import { registerEnumType } from '@nestjs/graphql';

export enum LoeybCategoryType {
  // health
  FOOD = 'FOOD',
  EXERCISE = 'EXERCISE',
  SICK = 'SICK',
  MEDICINE = 'MEDICINE',

  // mind
  THOUGHT = 'THOUGHT',
  EMOTION = 'EMOTION',
  GOALS = 'GOALS',
  IDEAS = 'IDEAS',

  // social
  FRIENDS = 'FRIENDS',
  FAMILY = 'FAMILY',
  PETS = 'PETS',
  COWORKER = 'COWORKER',

  // hobby
  FASHION = 'FASHION',
  MUSIC = 'MUSIC',
  ART = 'ART',
  BOOKS = 'BOOKS',
  VIDEO = 'VIDEO',
  TRAVEL = 'TRAVEL',
  SPORTS = 'SPORTS',

  // work
  PROJECT = 'PROJECT',
  SCHOOL = 'SCHOOL',
  SKILL = 'SKILL',
  COMPANY = 'COMPANY',
  AWARD = 'AWARD',
}

registerEnumType(LoeybCategoryType, {
  name: 'LoeybCategoryType',
  description: '유저들의 국가',
  valuesMap: {
    FOOD: { description: '' },
    EXERCISE: { description: '' },
    SICK: { description: '' },
    MEDICINE: { description: '' },
    THOUGHT: { description: '' },
    EMOTION: { description: '' },
    GOALS: { description: '' },
    IDEAS: { description: '' },
    FRIENDS: { description: '' },
    FAMILY: { description: '' },
    PETS: { description: '' },
    COWORKER: { description: '' },
    FASHION: { description: '' },
    MUSIC: { description: '' },
    ART: { description: '' },
    BOOKS: { description: '' },
    VIDEO: { description: '' },
    TRAVEL: { description: '' },
    SPORTS: { description: '' },
    PROJECT: { description: '' },
    SCHOOL: { description: '' },
    SKILL: { description: '' },
    COMPANY: { description: '' },
    AWARD: { description: '' },
  },
});
