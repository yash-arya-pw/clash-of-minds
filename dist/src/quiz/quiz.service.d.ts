import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
export declare class QuizService {
    private quizModel;
    constructor(quizModel: Model<QuizDocument>);
    create(dto: CreateQuizDto): Promise<import("mongoose").Document<unknown, {}, QuizDocument, {}> & Quiz & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findById(id: string): Promise<import("mongoose").FlattenMaps<QuizDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").FlattenMaps<QuizDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    })[]>;
    update(id: string, dto: UpdateQuizDto): Promise<import("mongoose").Document<unknown, {}, QuizDocument, {}> & Quiz & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, QuizDocument, {}> & Quiz & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
