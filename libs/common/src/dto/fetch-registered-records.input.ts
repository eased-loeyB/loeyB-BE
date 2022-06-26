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
 * FetchRegisteredRecordsInput
 *
 * @description FetchRegisteredRecordsInput
 */
@InputType('FetchRegisteredRecordsInput', {
  description: '저장된 사진 가져오기',
})
export class FetchRegisteredRecordsInput extends AbstractInput {
  @Length(6, 320)
  @IsEmail()
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true, description: '이메일' })
  @StringTransform()
  email?: string;

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

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  date?: string;
}
