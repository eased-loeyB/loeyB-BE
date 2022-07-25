import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { AbstractInput, AreaCategoryInput } from '.';
import { StringTransform } from './transformer';
/**
 * RegisterCategoriesInput
 *
 * @description 회원가입하고 나서 이름, 카테고리 입력할때
 */
@InputType('RegisterCategoriesInput', { description: 'registerCategories' })
export class RegisterCategoriesInput extends AbstractInput {
  @Length(6, 320)
  @IsEmail()
  @IsString()
  @IsOptional()
  @StringTransform()
  email?: string;

  // @IsNotEmpty()
  // @IsString()
  // @Field(() => String, { nullable: false, description: 'name' })
  // @StringTransform()
  // name!: string;

  @IsNotEmpty()
  @Field(() => [AreaCategoryInput], {
    nullable: false,
    description: 'category',
  })
  areaCategory!: AreaCategoryInput[];
}
