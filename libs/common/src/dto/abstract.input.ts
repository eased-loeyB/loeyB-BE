import { InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import { Language } from '../constants';

@InputType({ isAbstract: true, description: 'base input' })
export abstract class AbstractInput {
  @IsEnum(Language)
  @IsOptional()
  language?: Language = Language.KOREAN;
}
