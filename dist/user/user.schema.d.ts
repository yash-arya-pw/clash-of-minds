import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    id: Types.ObjectId;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    course: string;
    trophies: number;
    gold: number;
    elixir: number;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
