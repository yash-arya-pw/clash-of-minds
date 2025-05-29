import { Document, Types } from 'mongoose';
export type UserTroopMappingDocument = UserTroopMapping & Document;
export declare class UserTroopMapping {
    id: Types.ObjectId;
    userId: Types.ObjectId;
    troopId: Types.ObjectId;
    quantity: number;
}
export declare const UserTroopMappingSchema: import("mongoose").Schema<UserTroopMapping, import("mongoose").Model<UserTroopMapping, any, any, any, Document<unknown, any, UserTroopMapping, any> & UserTroopMapping & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserTroopMapping, Document<unknown, {}, import("mongoose").FlatRecord<UserTroopMapping>, {}> & import("mongoose").FlatRecord<UserTroopMapping> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
