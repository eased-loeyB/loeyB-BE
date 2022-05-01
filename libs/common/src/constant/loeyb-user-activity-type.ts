import { registerEnumType } from '@nestjs/graphql';

export enum LOEYBUserActivityType {
  /** @TODO 확인필요 */
  PAGE_VISIT = 'PAGE_VISIT',
  BUTTON_CLICK = 'BUTTON_CLICK',
  LINK_CLICK = 'LINK_CLICK',
  ACTION_INPUT = 'INPUT_CLICK',
}

registerEnumType(LOEYBUserActivityType, {
  name: 'LOEYBUserActivityType',
  description: '액티비티 타입',
});
