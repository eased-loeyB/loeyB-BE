import { Field, ObjectType } from '@nestjs/graphql';
import { Many } from '.';
import { LoeybAreaType } from '../constant';

@ObjectType({ description: '' })
export class RegisteredNameAreaAndCategory {
  @Field(() => String, { nullable: true, description: '' })
  name?: string;
  @Field(() => LoeybAreaType, {
    nullable: true,
    description: '',
  })
  area?: LoeybAreaType;
  @Field(() => String, { nullable: true, description: '' })
  category?: string;
}

@ObjectType({ description: '' })
export class RegisteredNameAreaAndCategoryOutput extends Many(
  RegisteredNameAreaAndCategory,
) {}
