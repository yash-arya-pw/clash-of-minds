import { Document, Types } from 'mongoose';
export type QuizDocument = Quiz & Document;
export declare class Quiz {
    title: string;
    description?: string;
    isPublished: boolean;
    questions: Types.ObjectId[];
    createdBy: Types.ObjectId;
    isDeleted: boolean;
}
export declare const QuizSchema: import("mongoose").Schema<Quiz, import("mongoose").Model<Quiz, any, any, any, Document<unknown, any, Quiz, any> & Quiz & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Quiz, Document<unknown, {}, import("mongoose").FlatRecord<Quiz>, {}> & import("mongoose").FlatRecord<Quiz> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
