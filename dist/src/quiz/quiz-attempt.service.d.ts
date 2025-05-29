import { Model } from 'mongoose';
import { QuestionDocument } from './schemas/question.schema';
import { QuizAttempt, QuizAttemptDocument } from './schemas/quiz-attempt.schema';
import { QuizDocument } from './schemas/quiz.schema';
import { SubmitQuizAttemptDto } from './dto/submit-quiz-attempt.dto';
export declare class QuizAttemptService {
    private attemptModel;
    private quizModel;
    private questionModel;
    constructor(attemptModel: Model<QuizAttemptDocument>, quizModel: Model<QuizDocument>, questionModel: Model<QuestionDocument>);
    getQuestionsForQuiz(quizId: string): Promise<{
        _id: any;
        text: string;
        options: string[];
    }[]>;
    submitAttempt(userId: string, quizId: string, dto: SubmitQuizAttemptDto): Promise<import("mongoose").Document<unknown, {}, QuizAttemptDocument, {}> & QuizAttempt & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getUserQuizLogs(userId: string): Promise<any[]>;
    getAttemptDetails(userId: string, quizId: string): Promise<{
        quizId: string;
        score: number;
        responses: {
            question: any;
            options: any;
            selectedAnswerIndex: any;
            correctAnswerIndex: any;
            isCorrect: any;
        }[];
    }>;
}
