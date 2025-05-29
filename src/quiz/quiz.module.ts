import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Question, QuestionSchema } from './schemas/question.schema';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { QuizAttempt, QuizAttemptSchema } from './schemas/quiz-attempt.schema';

import { QuestionService } from './question.service';
import { QuizService } from './quiz.service';
import { QuizAttemptService } from './quiz-attempt.service';
import { QuizAttemptsController } from './quiz-attempts.controller';
import { QuestionsController } from './questions.controller';
import { QuizzesController } from './quizzes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: Quiz.name, schema: QuizSchema },
      { name: QuizAttempt.name, schema: QuizAttemptSchema },
    ]),
  ],
  controllers: [QuestionsController, QuizzesController, QuizAttemptsController],
  providers: [QuestionService, QuizService, QuizAttemptService],
  exports: [MongooseModule, QuestionService, QuizService, QuizAttemptService],
})
export class QuizModule {}
