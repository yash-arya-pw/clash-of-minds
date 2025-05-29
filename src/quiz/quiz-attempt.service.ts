import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema';
import {
  QuizAttempt,
  QuizAttemptDocument,
} from './schemas/quiz-attempt.schema';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { SubmitQuizAttemptDto } from './dto/submit-quiz-attempt.dto';

@Injectable()
export class QuizAttemptService {
  constructor(
    @InjectModel(QuizAttempt.name)
    private attemptModel: Model<QuizAttemptDocument>,
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async getQuestionsForQuiz(quizId: string) {
    const quiz = await this.quizModel
      .findById(quizId)
      .populate<{ questions: Question[] }>('questions')
      .lean();

    if (!quiz) throw new NotFoundException('Quiz not found');

    return quiz.questions.map((q) => ({
      _id: (q as any)._id,
      text: q.text,
      options: q.options,
    }));
  }

  async submitAttempt(
    userId: string,
    quizId: string,
    dto: SubmitQuizAttemptDto,
  ) {
    const existing = await this.attemptModel.findOne({
      user: userId,
      quiz: quizId,
    });
    if (existing) {
      throw new BadRequestException('You have already submitted this quiz.');
    }

    const quiz = await this.quizModel
      .findById(quizId)
      .populate<{ questions: Question[] }>('questions')
      .lean();

    if (!quiz) throw new NotFoundException('Quiz not found');

    let score = 0;
    const responseMap = dto.responses.reduce(
      (acc, r) => {
        acc[r.question] = r.selectedAnswerIndex;
        return acc;
      },
      {} as Record<string, number>,
    );

    const responses = quiz.questions.map((q) => {
      const qAny = q as any;
      const selected = responseMap[qAny._id.toString()];
      const isAnswered = selected !== undefined;
      const isCorrect = isAnswered && selected === qAny.correctAnswerIndex;
      if (isCorrect) score++;
      return {
        question: qAny._id,
        selectedAnswerIndex: isAnswered ? selected : -1,
        isCorrect,
      };
    });

    return this.attemptModel.create({
      user: userId,
      quiz: quizId,
      responses,
      score,
      isCompleted: true,
      completedAt: new Date(),
      startedAt: new Date(),
    });
  }

  async getUserQuizLogs(userId: string): Promise<any[]> {
    const attempts = await this.attemptModel
      .find({ user: userId })
      .populate({
        path: 'quiz',
        select: 'title questions',
        populate: {
          path: 'questions',
          select: 'text options correctAnswerIndex',
        },
      })
      .populate({
        path: 'responses.question',
        select: 'text options correctAnswerIndex',
      })
      .select('quiz score completedAt responses')
      .sort({ completedAt: -1 })
      .lean();

    return attempts.map((attempt: any) => {
      const quizQuestions = attempt.quiz.questions || [];
      const responseMap: Record<string, any> = {};
      (attempt.responses || []).forEach((resp: any) => {
        responseMap[resp.question._id.toString()] = resp;
      });

      // For each question in the quiz, show user's response if exists, else show unanswered
      const questions = quizQuestions.map((q: any) => {
        const resp = responseMap[q._id.toString()];
        return {
          questionId: q._id,
          text: q.text,
          options: q.options,
          correctAnswerIndex: q.correctAnswerIndex,
          selectedAnswerIndex: resp ? resp.selectedAnswerIndex : -1,
          isCorrect: resp ? resp.isCorrect : false,
        };
      });

      return {
        quizId: attempt.quiz._id,
        quizTitle: attempt.quiz.title,
        score: attempt.score,
        completedAt: attempt.completedAt,
        questions,
      };
    });
  }

  async getAttemptDetails(userId: string, quizId: string) {
    const attempt = await this.attemptModel
      .findOne({ user: userId, quiz: quizId })
      .populate({
        path: 'responses.question',
        select: 'text options correctAnswerIndex',
      })
      .lean();

    if (!attempt) throw new NotFoundException('No attempt found');

    return {
      quizId,
      score: attempt.score,
      responses: attempt.responses.map((r: any) => ({
        question: r.question.text,
        options: r.question.options,
        selectedAnswerIndex: r.selectedAnswerIndex,
        correctAnswerIndex: r.question.correctAnswerIndex,
        isCorrect: r.isCorrect,
      })),
    };
  }

  async getQuizzesNotTakenByUser(userId: string) {
    // 1. Get quiz IDs that the user has already attempted
    const attemptedQuizIds = await this.attemptModel
      .find({ user: userId })
      .distinct('quiz');

    // 2. Fetch quizzes not in the attempted list
    const quizzes = await this.quizModel
      .find({ _id: { $nin: attemptedQuizIds } })
      .select('title description') // add more fields if needed
      .lean();

    return quizzes;
  }
}
