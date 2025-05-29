import { Document, Types } from 'mongoose';
export type UserResourceMappingDocument = UserResourceMapping & Document;
export declare class UserResourceMapping {
    id: Types.ObjectId;
    userId: Types.ObjectId;
    assetId: Types.ObjectId;
    index: number[];
}
export declare const UserResourceMappingSchema: import("mongoose").Schema<UserResourceMapping, import("mongoose").Model<UserResourceMapping, any, any, any, Document<unknown, any, UserResourceMapping, any> & UserResourceMapping & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserResourceMapping, Document<unknown, {}, import("mongoose").FlatRecord<UserResourceMapping>, {}> & import("mongoose").FlatRecord<UserResourceMapping> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
