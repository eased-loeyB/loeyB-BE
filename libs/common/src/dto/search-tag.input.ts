import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { StringTransform } from './transformer';
import { AbstractInput } from '.';

@InputType({ description: '' })
export class SearchTagInput extends AbstractInput {
  @IsOptional()
  @Length(6, 320)
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @StringTransform()
  email?: string | null;

  @IsString()
  @Field(() => String, { nullable: false, description: '' })
  @StringTransform()
  keyword!: string;

  @IsOptional()
  @Field(() => Number, { nullable: true, description: '', defaultValue: 40 })
  limit?: number;

  @IsOptional()
  @Field(() => Number, { nullable: true, description: '', defaultValue: 0 })
  offset?: number;
}
