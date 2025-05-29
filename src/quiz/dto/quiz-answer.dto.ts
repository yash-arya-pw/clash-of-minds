import { IsMongoId, IsInt, Min } from 'class-validator';

export class QuizAnswerDto {
  @IsMongoId()
  question: string;

  @IsInt()
  @Min(0)
  selectedAnswerIndex: number;
}
