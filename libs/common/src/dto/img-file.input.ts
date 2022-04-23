import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';
import { AbstractInput } from '.';
import { StringTransform } from './transformer';

@InputType({ description: '' })
export class ImgFileInput extends AbstractInput {
  @IsUUID(4)
  @StringTransform()
  @Field(() => String, { nullable: false })
  fileId!: string;

  @IsString()
  @StringTransform()
  @Field(() => String, { nullable: false })
  fileName!: string;
}
