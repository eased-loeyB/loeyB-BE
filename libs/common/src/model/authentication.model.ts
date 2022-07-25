import { One } from './output.model';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '' })
export class Authentication {
  @Field(() => String, { nullable: false, description: 'JWT' })
  accessToken!: string;

  @Field(() => String, {
    nullable: false,
    defaultValue: 'Bearer',
    description: '',
  })
  tokenType!: string;

  @Field(() => Float, { nullable: false, description: '' })
  expiresIn!: number;

  @Field(() => String, { nullable: false, description: 'JWT' })
  refreshToken!: string;

  @Field(() => String, { nullable: true, description: '' })
  redirectUrl?: string | null;

  @Field(() => Boolean, { nullable: true, description: '유저이름 존재 유무' })
  hasUserName?: boolean | null;
}

@ObjectType({ description: '' })
export class AuthenticationOutput extends One(Authentication) {}
