import { Document, Types } from 'mongoose';
export type BattleLogDocument = BattleLog & Document;
export declare class BattleLog {
    id: Types.ObjectId;
    attackerId: Types.ObjectId;
    defenderId: Types.ObjectId;
    result: 'win' | 'lose';
    trophies: number;
    gold: number;
    elixir: number;
}
export declare const BattleLogSchema: import("mongoose").Schema<BattleLog, import("mongoose").Model<BattleLog, any, any, any, Document<unknown, any, BattleLog, any> & BattleLog & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BattleLog, Document<unknown, {}, import("mongoose").FlatRecord<BattleLog>, {}> & import("mongoose").FlatRecord<BattleLog> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
