import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

import { StringTransform } from './transformer';
import { AbstractInput } from '.';

@InputType({ description: '이메일 인증' })
export class VerifyEmailVerificationCodeInput extends AbstractInput {
  @Length(6, 320)
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Field(() => String, { nullable: false, description: '이메일' })
  @StringTransform()
  email!: string;

  @Length(6, 6)
  @IsNotEmpty()
  @IsNumberString()
  @Field(() => String, { nullable: false, description: '인증번호' })
  @StringTransform()
  code!: string;
}
