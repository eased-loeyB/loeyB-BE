import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { AbstractInput } from '.';
import { StringTransform } from './transformer';
/**
 * AuthenticationInput
 *
 * @description loeyb 로그인
 */
@InputType('AuthenticationInput', { description: '로그인' })
export class AuthenticationInput extends AbstractInput {
  @Length(6, 320)
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false, description: '이메일' })
  @StringTransform()
  email!: string;

  @Length(8, 16)
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false, description: '비밀번호' })
  @StringTransform()
  password!: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: false, description: 'device token' })
  @StringTransform()
  deviceToken?: string | null;
}
