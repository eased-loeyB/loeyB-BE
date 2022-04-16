import { Field, InputType } from '@nestjs/graphql';
import { IsJWT, IsNotEmpty } from 'class-validator';

import { StringTransform } from './transformer';
import { AbstractInput } from '.';

@InputType({ description: '토큰 갱신' })
export class TokenRefreshInput extends AbstractInput {
  @IsJWT()
  @IsNotEmpty()
  @Field(() => String, { nullable: false, description: 'refresh 토큰' })
  @StringTransform()
  refreshToken!: string;
}
