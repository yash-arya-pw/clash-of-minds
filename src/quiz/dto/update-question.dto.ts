import {
  IsOptional,
  IsString,
  IsArray,
  ArrayMinSize,
  IsInt,
  Min,
} from 'class-validator';

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  options?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  correctAnswerIndex?: number;
}
