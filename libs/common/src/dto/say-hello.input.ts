import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

import { StringTransform } from '../transformer';

@InputType({ description: '카파 로그인' })
export class SayHelloInput {
  @IsString()
  @Field(() => String, {
    nullable: false,
    description: 'sayHello',
  })
  @StringTransform()
  sayHello!: string;
}
