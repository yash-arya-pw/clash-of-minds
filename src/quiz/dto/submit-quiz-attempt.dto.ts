import { Type } from 'class-transformer';
import { IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { QuizAnswerDto } from './quiz-answer.dto';

export class SubmitQuizAttemptDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerDto)
  responses: QuizAnswerDto[];
}
