import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Many, One } from '.';

/**
 * Authentication
 *
 * @TODO fill description
 */
@ObjectType({ description: '' })
export class StardustRecords {
  @Field(() => String, { nullable: true, description: '' })
  fileId?: string;

  @Field(() => String, {
    nullable: true,
    description: '',
  })
  fileName?: string;

  @Field(() => Number, {
    nullable: true,
    description: '중요도',
    defaultValue: 0,
  })
  importance?: number;

  @Field(() => String, { nullable: true, description: '' })
  location?: string;

  @Field(() => String, { nullable: true, description: '' })
  date?: string;

  @Field(() => String, { nullable: true, description: '' })
  area?: string;

  @Field(() => String, { nullable: true, description: '' })
  category?: string;

  @Field(() => String, { nullable: true, description: '' })
  tag?: string;
}
@ObjectType({ description: '' })
export class StardustRecordsOutput extends Many(StardustRecords) {}
