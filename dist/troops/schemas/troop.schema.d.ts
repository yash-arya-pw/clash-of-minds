import { Document, Types } from 'mongoose';
export type TroopDocument = Troop & Document;
export declare class Troop {
    id: Types.ObjectId;
    name: string;
    attack: number;
    level: number;
    imageId: Types.ObjectId;
}
export declare const TroopSchema: import("mongoose").Schema<Troop, import("mongoose").Model<Troop, any, any, any, Document<unknown, any, Troop, any> & Troop & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Troop, Document<unknown, {}, import("mongoose").FlatRecord<Troop>, {}> & import("mongoose").FlatRecord<Troop> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
