import { Field, Float, ObjectType } from '@nestjs/graphql';
import { One } from 'models';

/**
 * Authentication
 *
 * @TODO fill description
 */
@ObjectType({ description: '' })
export class RegisterUSer {
  // @Field(() => String, { nullable: false, description: 'JWT' })
  // accessToken!: string;
  // @Field(() => String, {
  //   nullable: false,
  //   defaultValue: 'Bearer',
  //   description: '',
  // })
  // tokenType!: string;
  // @Field(() => Float, { nullable: false, description: '' })
  // expiresIn!: number;
  // @Field(() => String, { nullable: false, description: 'JWT' })
  // refreshToken!: string;
  // @Field(() => String, { nullable: true, description: '' })
  // redirectUrl?: string | null;
  @Field(() => String)
  result: string;
}
@ObjectType({ description: '' })
export class RegisterUserOutput extends One(RegisterUSer) {}
