import { LOEYBErrorCode } from '../libs/common/src/constants';
import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: 'Default Output' })
export class Output {
  @ApiProperty()
  @Field(() => LOEYBErrorCode, {
    nullable: false,
    defaultValue: LOEYBErrorCode.SUCCESS,
    description: 'LOEYB ERROR CODE',
  })
  result!: LOEYBErrorCode;

  @ApiProperty()
  @Field(() => String, {
    nullable: true,
    description: 'errorMessage',
  })
  errorMessage?: string | null;
}

export function One<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true, description: 'Object' })
  abstract class ObjType extends Output {
    @ApiProperty()
    @Field(() => classRef, { nullable: true })
    data?: T;
  }
  return ObjType;
}

export function Many<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true, description: 'Array List' })
  abstract class ObjType extends Output {
    @ApiProperty()
    @Field(() => [classRef], { nullable: true })
    data?: T[];
  }
  return ObjType;
}
