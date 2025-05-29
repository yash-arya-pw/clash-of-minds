import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizService } from './quiz.service';
export declare class QuizzesController {
    private readonly quizService;
    constructor(quizService: QuizService);
    create(dto: CreateQuizDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/quiz.schema").QuizDocument, {}> & import("./schemas/quiz.schema").Quiz & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").FlattenMaps<import("./schemas/quiz.schema").QuizDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<import("./schemas/quiz.schema").QuizDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateQuizDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/quiz.schema").QuizDocument, {}> & import("./schemas/quiz.schema").Quiz & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/quiz.schema").QuizDocument, {}> & import("./schemas/quiz.schema").Quiz & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
