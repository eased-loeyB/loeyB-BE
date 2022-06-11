import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { AbstractInput, AreaCategoryTagInput, ImgFileInput } from '.';
import { StringTransform } from './transformer';

@InputType({ description: '' })
export class UpdateRecordInput extends AbstractInput {
  @Length(6, 320)
  @IsEmail()
  @IsString()
  @IsOptional()
  @StringTransform()
  email?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  recordId: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => ImgFileInput, {
    nullable: true,
  })
  imgFiles?: ImgFileInput | null;

  @ValidateNested({ each: true })
  @Field(() => [AreaCategoryTagInput], { nullable: true })
  areaCategoryTag?: AreaCategoryTagInput[];

  @IsString()
  @Field(() => String, { nullable: true })
  date?: string;

  @IsString()
  @StringTransform()
  @Field(() => String, { nullable: true })
  location?: string;

  @IsOptional()
  @Field(() => Number, { nullable: true })
  importance?: number;

  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string;
}
