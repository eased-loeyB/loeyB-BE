import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { AbstractInput } from '.';
import { StringTransform } from './transformer';
/**
 * fetchTagRatioInput
 *
 * @description 주어진 날짜에 어떤 카테고리를 많이 사용햤는지
 */
@InputType('fetchTagRatioInput', {
  description: 'show tag ratio of given date condition',
})
export class fetchTagRatioInput extends AbstractInput {
  @Length(6, 320)
  @IsEmail()
  @IsOptional()
  @IsString()
  @StringTransform()
  email?: string;

  @IsString()
  @Field(() => String, { nullable: true, defaultValue: '40' })
  limit?: string;

  @IsString()
  @Field(() => String, { nullable: true, defaultValue: '0' })
  offset?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  date?: string;
}
