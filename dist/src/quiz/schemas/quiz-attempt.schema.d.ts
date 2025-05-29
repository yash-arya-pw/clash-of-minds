import { Types } from 'mongoose';
export type QuizAttemptDocument = QuizAttempt & Document;
export declare class QuizAttempt {
    user: Types.ObjectId;
    quiz: Types.ObjectId;
    responses: {
        question: Types.ObjectId;
        selectedAnswerIndex: number;
        isCorrect: boolean;
    }[];
    score: number;
    isCompleted: boolean;
    startedAt?: Date;
    completedAt?: Date;
}
export declare const QuizAttemptSchema: import("mongoose").Schema<QuizAttempt, import("mongoose").Model<QuizAttempt, any, any, any, import("mongoose").Document<unknown, any, QuizAttempt, any> & QuizAttempt & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, QuizAttempt, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<QuizAttempt>, {}> & import("mongoose").FlatRecord<QuizAttempt> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
