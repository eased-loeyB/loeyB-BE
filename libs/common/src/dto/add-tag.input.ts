import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { AbstractInput } from '.';
import { LoeybCategoryType } from '../constant';
import { StringTransform } from './transformer';

@InputType('addTagInput', { description: 'addTagInput' })
export class addTagInput extends AbstractInput {
  @Length(6, 320)
  @IsEmail()
  @IsOptional()
  @IsString()
  @StringTransform()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => LoeybCategoryType, { nullable: false, description: 'category' })
  @StringTransform()
  category!: LoeybCategoryType;

  @IsNotEmpty()
  @IsString()
  @StringTransform()
  @Field(() => String, {
    nullable: false,
    description: 'area',
  })
  tag!: string;
}
