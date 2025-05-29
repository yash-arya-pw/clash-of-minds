import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question, QuestionDocument } from './schemas/question.schema';
export declare class QuestionService {
    private questionModel;
    constructor(questionModel: Model<QuestionDocument>);
    create(dto: CreateQuestionDto): Promise<import("mongoose").Document<unknown, {}, QuestionDocument, {}> & Question & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): Promise<Question[] | null>;
    findById(id: string): Promise<Question | null>;
    update(id: string, dto: UpdateQuestionDto): Promise<import("mongoose").Document<unknown, {}, QuestionDocument, {}> & Question & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, QuestionDocument, {}> & Question & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
