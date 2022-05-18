import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Many, One } from '.';

/**
 * Authentication
 *
 * @TODO fill description
 */

@ObjectType({ description: '' })
export class RegisteredCategoryAndTag {
  @Field(() => String, { nullable: true, description: '' })
  category?: string;
  @Field(() => String, { nullable: true, description: '' })
  tag?: string;
}

@ObjectType({ description: '' })
export class RegisteredCategoryAndTagOutput extends One(
  RegisteredCategoryAndTag,
) {}

@ObjectType({ description: '' })
export class RegisteredCategoryAndTagsOutput extends Many(
  RegisteredCategoryAndTag,
) {}
