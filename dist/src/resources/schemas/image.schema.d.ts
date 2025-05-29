import { Document, Types } from 'mongoose';
import { ImageType } from '../enums/image-type.enum';
export type ImageDocument = Image & Document;
export declare class Image {
    id: Types.ObjectId;
    url: string;
    type: ImageType;
}
export declare const ImageSchema: import("mongoose").Schema<Image, import("mongoose").Model<Image, any, any, any, Document<unknown, any, Image, any> & Image & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Image, Document<unknown, {}, import("mongoose").FlatRecord<Image>, {}> & import("mongoose").FlatRecord<Image> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
