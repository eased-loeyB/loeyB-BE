import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { LOEYBUserActivityType } from '../constant';
import { StringTransform } from './transformer';
import { AbstractInput } from '.';

@InputType({ description: '유저 활동 로그' })
export class UserActivityLogInput extends AbstractInput {
  @IsOptional()
  @Length(6, 320)
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: true, description: '이메일' })
  @StringTransform()
  email?: string | null;

  @IsOptional()
  @IsEnum(LOEYBUserActivityType)
  @Field(() => LOEYBUserActivityType, {
    nullable: true,
    description: '활동 타입',
  })
  activityType?: LOEYBUserActivityType | null;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, description: '활동 id' })
  @StringTransform()
  activitiId?: string | null;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, description: '아이피' })
  @StringTransform()
  ip?: string | null;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, description: '운영체제' })
  @StringTransform()
  os?: string | null;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, description: '기기 종류' })
  @StringTransform()
  deviceType?: string | null;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, description: '브라우저 종류' })
  @StringTransform()
  browser?: string | null;
}
