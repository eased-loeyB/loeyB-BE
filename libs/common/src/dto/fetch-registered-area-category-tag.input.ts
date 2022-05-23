import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { AbstractInput, AreaCategoryInput } from '.';
import { LoeybAreaType } from '../constant';
import { StringTransform } from './transformer';
/**
 * addCategoriesAndAreaInput
 *
 * @description 사진 업로드 할 때, 카테고리를 추가하고 싶을 때
 */
@InputType('fetchRegisteredAreaAndCategoryAndTagInput', {
  description: 'show registered area, category, tag',
})
export class fetchRegisteredAreaAndCategoryAndTagInput extends AbstractInput {
  @Length(6, 320)
  @IsEmail()
  @IsOptional()
  @IsString()
  @StringTransform()
  email?: string;

  @IsString()
  @Field(() => String, { nullable: true, defaultValue: '40' })
  limit?: string;

  @IsString()
  @Field(() => String, { nullable: true, defaultValue: '0' })
  offset?: string;
}
