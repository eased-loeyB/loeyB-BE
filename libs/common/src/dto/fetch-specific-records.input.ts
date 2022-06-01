import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { AbstractInput } from '.';
import { LoeybAreaType, LoeybCategoryType } from '../constant';
import { StringTransform } from './transformer';
/**
 * FetchSpecificRecordsInput
 *
 * @description FetchSpecificRecordsInput
 */
@InputType('FetchSpecificRecordsInput', {
  description: '주어진 조건에 부합하는 이미지 파일 가져오기',
})
export class FetchSpecificRecordsInput extends AbstractInput {
  @IsString()
  @Field(() => String, { nullable: true, description: '이메일' })
  userId?: string;

  @IsString()
  @IsOptional()
  @Field(() => LoeybAreaType, { nullable: true, description: 'area' })
  area?: LoeybAreaType;

  @IsString()
  @IsOptional()
  @Field(() => LoeybCategoryType, { nullable: true, description: 'category' })
  category?: LoeybCategoryType;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true, description: 'tag' })
  tag?: string;
}
