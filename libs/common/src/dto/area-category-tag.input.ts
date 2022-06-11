import { Field, InputType } from '@nestjs/graphql';
import { AbstractInput } from '.';
import { LoeybAreaType } from '../constant';
import { LoeybCategoryType } from '../constant/loeyb-category-type';

@InputType({ description: '' })
export class AreaCategoryTagInput extends AbstractInput {
  @Field(() => LoeybAreaType, { nullable: true })
  area?: LoeybAreaType;

  @Field(() => LoeybCategoryType, { nullable: true })
  category?: LoeybCategoryType;

  @Field(() => String, { nullable: true })
  tag?: string;
}
