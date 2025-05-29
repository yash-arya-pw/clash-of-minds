import { Types } from 'mongoose';
export declare enum QuestionType {
    MCQ = "MCQ"
}
export type QuestionDocument = Question & Document;
export declare class Question {
    text: string;
    type: QuestionType;
    options: string[];
    correctAnswerIndex: number;
    quiz: Types.ObjectId;
}
export declare const QuestionSchema: import("mongoose").Schema<Question, import("mongoose").Model<Question, any, any, any, import("mongoose").Document<unknown, any, Question, any> & Question & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Question, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Question>, {}> & import("mongoose").FlatRecord<Question> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
