import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { AbstractInput } from '.';

@InputType({ description: '이메일 인증 코드' })
export class GoogleLoginInput extends AbstractInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false, description: '' })
  token!: string;
}
