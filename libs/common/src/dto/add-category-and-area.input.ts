import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { AbstractInput, AreaCategoryInput } from '.';
import { LoeybAreaType, LoeybCategoryType } from '../constant';
import { StringTransform } from './transformer';
/**
 * addCategoriesAndAreaInput
 *
 * @description 사진 업로드 할 때, 카테고리를 추가하고 싶을 때
 */
@InputType('addCategoryAndAreaInput', { description: 'addCategoryAndArea' })
export class addCategoryAndAreaInput extends AbstractInput {
  @Length(6, 320)
  @IsEmail()
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  @StringTransform()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => LoeybCategoryType, { nullable: false, description: 'category' })
  @StringTransform()
  category!: LoeybCategoryType;

  @IsNotEmpty()
  @IsString()
  @StringTransform()
  @Field(() => LoeybAreaType, {
    nullable: false,
    description: 'area',
  })
  area!: LoeybAreaType;
}
