import { QuizAttemptService } from './quiz-attempt.service';
import { SubmitQuizAttemptDto } from './dto/submit-quiz-attempt.dto';
export declare class QuizAttemptsController {
    private readonly quizAttemptService;
    constructor(quizAttemptService: QuizAttemptService);
    getQuestionsForQuiz(quizId: string): Promise<{
        _id: any;
        text: string;
        options: string[];
    }[]>;
    submitQuizAttempt(quizId: string, dto: SubmitQuizAttemptDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/quiz-attempt.schema").QuizAttemptDocument, {}> & import("./schemas/quiz-attempt.schema").QuizAttempt & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getUserQuizLogs(req: any): Promise<any[]>;
    getUserAttemptHistory(quizId: string, req: any): Promise<{
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
