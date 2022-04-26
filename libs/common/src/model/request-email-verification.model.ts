import { One } from './output.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '' })
export class RequestEmailVerification {
  @Field(() => String, { nullable: false, description: 'JWT' })
  code!: string;
}

@ObjectType({ description: '' })
export class RequestEmailVerificationOutput extends One(
  RequestEmailVerification,
) {}
