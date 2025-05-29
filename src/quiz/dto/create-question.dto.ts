import { IsArray, IsInt, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsInt()
  correctAnswerIndex: number;
}
