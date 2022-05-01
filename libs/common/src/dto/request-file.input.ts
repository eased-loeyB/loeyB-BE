import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

import { StringTransform } from './transformer';
import { AbstractInput } from '.';

@InputType({ description: '' })
export class RequestFileInput extends AbstractInput {
  @Length(6, 320)
  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  email?: string | null;

  @IsUUID(4)
  @IsNotEmpty()
  @Field(() => String, { nullable: false, description: '파일 id' })
  @StringTransform()
  fileId!: string;
}
