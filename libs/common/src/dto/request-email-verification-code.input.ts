import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

import { StringTransform } from './transformer';
import { AbstractInput } from '.';

@InputType({ description: '이메일 인증 코드' })
export class RequestEmailVerificationCodeInput extends AbstractInput {
  @Length(6, 320)
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { nullable: false, description: '이메일' })
  @StringTransform()
  email!: string;
}
