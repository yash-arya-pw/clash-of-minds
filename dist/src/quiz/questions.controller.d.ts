import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';
export declare class QuestionsController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(dto: CreateQuestionDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/question.schema").QuestionDocument, {}> & import("./schemas/question.schema").Question & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): Promise<import("./schemas/question.schema").Question[]>;
    findOne(id: string): Promise<import("./schemas/question.schema").Question>;
    update(id: string, dto: UpdateQuestionDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/question.schema").QuestionDocument, {}> & import("./schemas/question.schema").Question & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/question.schema").QuestionDocument, {}> & import("./schemas/question.schema").Question & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
