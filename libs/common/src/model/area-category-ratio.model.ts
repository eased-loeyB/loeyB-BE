import { Field, ObjectType } from '@nestjs/graphql';
import { Many } from '.';
import { LoeybAreaType, LoeybCategoryType } from '../constant';

@ObjectType()
export class tagRatio {
  @Field(() => String, {
    nullable: true,
  })
  tag?: string;

  @Field(() => Number, {
    nullable: true,
  })
  ratio?: number;
}

@ObjectType()
export class areaTagRatio {
  @Field(() => LoeybAreaType, {
    nullable: true,
  })
  area?: LoeybAreaType;

  @Field(() => [tagRatio], { nullable: true })
  categoryRatio?: tagRatio[];
}

@ObjectType()
export class areaTagRatiosOutput extends Many(areaTagRatio) {}
