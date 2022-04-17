import { Field, Float, ObjectType } from '@nestjs/graphql';
import { One } from '.';

/**
 * Authentication
 *
 * @TODO fill description
 */
@ObjectType({ description: '' })
export class RegisterUSer {
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
}
@ObjectType({ description: '' })
export class RegisterUserOutput extends One(RegisterUSer) {}
