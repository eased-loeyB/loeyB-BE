import { One } from './index';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '' })
export class SayHello {
  @Field(() => String, { nullable: false, description: 'sayHello' })
  sayHello!: string;
}

@ObjectType({ description: '' })
export class SayHelloOutput extends One(SayHello) {}
