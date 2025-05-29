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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Quiz Attempts')
@ApiBearerAuth()
@Controller('quiz-attempts')
@UseGuards(JwtAuthGuard)
export class QuizAttemptsController {
  constructor(private readonly quizAttemptService: QuizAttemptService) {}

  @ApiOperation({
    summary: 'Get quiz questions',
    description: 'Retrieves all questions for a specific quiz to attempt it.',
  })
  @ApiParam({
    name: 'quizId',
    description: 'The ID of the quiz to get questions for',
  })
  @ApiResponse({
    status: 200,
    description: 'Quiz questions retrieved successfully.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          text: { type: 'string' },
          options: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Quiz not found.',
  })
  @Get(':quizId/questions')
  async getQuestionsForQuiz(@Param('quizId') quizId: string) {
    return this.quizAttemptService.getQuestionsForQuiz(quizId);
  }

  @ApiOperation({
    summary: 'Submit quiz attempt',
    description: 'Submits a quiz attempt with selected answers.',
  })
  @ApiParam({
    name: 'quizId',
    description: 'The ID of the quiz being attempted',
  })
  @ApiBody({ type: SubmitQuizAttemptDto })
  @ApiResponse({
    status: 200,
    description: 'Quiz attempt submitted successfully.',
    schema: {
      type: 'object',
      properties: {
        score: { type: 'number' },
        totalQuestions: { type: 'number' },
        correctAnswers: { type: 'number' },
        timeTaken: { type: 'number' },
        rewards: {
          type: 'object',
          properties: {
            gold: { type: 'number' },
            elixir: { type: 'number' },
            trophies: { type: 'number' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid submission data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token.',
  })
  @Post(':quizId/submit')
  async submitQuizAttempt(
    @Param('quizId') quizId: string,
    @Body() dto: SubmitQuizAttemptDto,
    @Request() req,
  ) {
    const userId = req.user._id;
    return this.quizAttemptService.submitAttempt(userId, quizId, dto);
  }

  @ApiOperation({
    summary: 'Get user quiz logs',
    description: 'Retrieves logs of all quizzes attempted by the current user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Quiz logs retrieved successfully.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          quizId: { type: 'string' },
          quizTitle: { type: 'string' },
          score: { type: 'number' },
          totalQuestions: { type: 'number' },
          correctAnswers: { type: 'number' },
          timeTaken: { type: 'number' },
          attemptedAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token.',
  })
  @Get('user/logs')
  async getUserQuizLogs(@Request() req) {
    const userId = req.user._id;
    return this.quizAttemptService.getUserQuizLogs(userId);
  }

  @ApiOperation({
    summary: 'Get quiz attempt history',
    description:
      'Retrieves quiz attempt history with responses and correct answers.',
  })
  @ApiParam({
    name: 'quizId',
    description: 'The ID of the quiz to get attempt history for',
  })
  @ApiResponse({
    status: 200,
    description: 'Quiz attempt history retrieved successfully.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          attemptId: { type: 'string' },
          score: { type: 'number' },
          totalQuestions: { type: 'number' },
          correctAnswers: { type: 'number' },
          timeTaken: { type: 'number' },
          attemptedAt: { type: 'string', format: 'date-time' },
          answers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                questionId: { type: 'string' },
                selectedAnswer: { type: 'number' },
                isCorrect: { type: 'boolean' },
                correctAnswer: { type: 'number' },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Quiz not found.',
  })
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
