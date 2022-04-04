import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';
import { AbstractInput } from '.';
import { StringTransform } from './transformer';
/**
 * RegisterCapaUserInput
 *
 * @description 카파 회원가입
 */
@InputType('RegisterUserInput', { description: '회원가입' })
export class RegisterUserInput extends AbstractInput {
  @Length(6, 320)
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false, description: '이메일' })
  @StringTransform()
  email!: string;
  // @Length(6, 6)
  // @IsNotEmpty()
  // @IsNumberString()
  // @Field(() => String, { nullable: false, description: '인증번호' })
  // @StringTransform()
  // code!: string;
  @Length(8, 16)
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false, description: '비밀번호' })
  @StringTransform()
  password!: string;
  @Length(8, 16)
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false, description: '비밀번호 확인' })
  @StringTransform()
  passwordConfirm!: string;
}
