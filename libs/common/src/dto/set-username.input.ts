import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

import { StringTransform } from './transformer';
import { AbstractInput } from '.';

@InputType({ description: '이메일 인증 코드' })
export class SetUsernameInput extends AbstractInput {
  @Length(6, 320)
  @IsNotEmpty()
  @IsEmail()
  @StringTransform()
  email!: string;

  @Field(() => String, { nullable: false, description: '' })
  username!: string;
}
