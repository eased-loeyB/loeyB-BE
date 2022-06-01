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
export class RegisterRecordInput extends AbstractInput {
  @Length(6, 320)
  @IsEmail()
  @IsString()
  @IsOptional()
  @StringTransform()
  email?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => ImgFileInput, {
    nullable: true,
  })
  imgFiles: ImgFileInput | null;

  @ValidateNested({ each: true })
  @Field(() => [AreaCategoryTagInput], { nullable: false })
  areaCategoryTag!: AreaCategoryTagInput[];

  @IsString()
  @StringTransform()
  @Field(() => String, { nullable: false })
  date!: string;

  @IsString()
  @StringTransform()
  @Field(() => String, { nullable: false })
  location!: string;

  @IsOptional()
  @Field(() => Number, { nullable: true })
  importance?: number;
}
