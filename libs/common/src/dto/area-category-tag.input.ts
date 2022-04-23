import { Field, InputType } from '@nestjs/graphql';
import { AbstractInput } from '.';
import { LoeybAreaType } from '../constant';
import { LoeybCategoryType } from '../constant/loeyb-category-type';

@InputType({ description: '' })
export class AreaCategoryTagInput extends AbstractInput {
  @Field(() => LoeybAreaType, { nullable: false })
  area!: LoeybAreaType;

  @Field(() => LoeybCategoryType, { nullable: false })
  category!: LoeybCategoryType;

  @Field(() => String, { nullable: true })
  tag?: string;
}
