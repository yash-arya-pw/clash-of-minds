import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { QuizAttemptService } from './quiz-attempt.service';
import { SubmitQuizAttemptDto } from './dto/submit-quiz-attempt.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('quiz-attempts')
@UseGuards(JwtAuthGuard)
export class QuizAttemptsController {
  constructor(private readonly quizAttemptService: QuizAttemptService) {}

  /**
   * Get all questions for a quiz (for attempting it)
   */
  @Get(':quizId/questions')
  async getQuestionsForQuiz(@Param('quizId') quizId: string) {
    return this.quizAttemptService.getQuestionsForQuiz(quizId);
  }

  /**
   * Submit a quiz attempt with selected answers
   */
  @Post(':quizId/submit')
  async submitQuizAttempt(
    @Param('quizId') quizId: string,
    @Body() dto: SubmitQuizAttemptDto,
    @Request() req,
  ) {
    const userId = req.user._id;
    return this.quizAttemptService.submitAttempt(userId, quizId, dto);
  }

  /**
   * Get logs of all quizzes attempted by current user
   */
  @Get('user/logs')
  async getUserQuizLogs(@Request() req) {
    const userId = req.user._id;
    return this.quizAttemptService.getUserQuizLogs(userId);
  }

  /**
   * Get quiz attempt history with responses and correct answers
   */
  @Get(':quizId/history')
  async getUserAttemptHistory(@Param('quizId') quizId: string, @Request() req) {
    const userId = req.user._id;
    return this.quizAttemptService.getAttemptDetails(userId, quizId);
  }

  @Get('not-attempted')
  getQuizzesNotAttempted(@Request() req) {
    const userId = req.user._id;
    return this.quizAttemptService.getQuizzesNotTakenByUser(userId);
  }
}
