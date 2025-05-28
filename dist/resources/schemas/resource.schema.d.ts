import { Document, Types } from 'mongoose';
export type ResourceDocument = Resource & Document;
export declare class Resource {
    id: Types.ObjectId;
    name: string;
    health: number;
    imageId: Types.ObjectId;
    level: number;
    cost: number;
}
export declare const ResourceSchema: import("mongoose").Schema<Resource, import("mongoose").Model<Resource, any, any, any, Document<unknown, any, Resource, any> & Resource & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Resource, Document<unknown, {}, import("mongoose").FlatRecord<Resource>, {}> & import("mongoose").FlatRecord<Resource> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
