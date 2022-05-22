import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Many, One } from '.';
import { LoeybAreaType, LoeybCategoryType } from '../constant';

/**
 * Authentication
 *
 * @TODO fill description
 */

@ObjectType({ description: '' })
export class RegisteredAreaAndCategoryAndTag {
  @Field(() => LoeybAreaType, {
    nullable: true,
    description: '',
  })
  area?: LoeybAreaType;
  @Field(() => LoeybCategoryType, { nullable: true, description: '' })
  category?: LoeybCategoryType;
  @Field(() => [String], { nullable: true, description: '' })
  tag?: string[];
}

@ObjectType({ description: '' })
export class RegisteredAreaAndCategoryAndTagOutput extends Many(
  RegisteredAreaAndCategoryAndTag,
) {}
