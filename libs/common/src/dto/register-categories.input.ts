import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { AbstractInput } from '.';
import { LoeybCategoryType } from '../constant';
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
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false, description: '이메일' })
  @StringTransform()
  email!: string;
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false, description: 'name' })
  @StringTransform()
  name!: string;
  @IsNotEmpty()
  @Field(() => [LoeybCategoryType], {
    nullable: false,
    description: 'category',
  })
  category!: LoeybCategoryType[];
}
