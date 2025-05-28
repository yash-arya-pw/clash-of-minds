import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ImageType } from '../enums/image-type.enum';

export type ImageDocument = Image & Document;

@Schema({ timestamps: true, collection: 'images' })
export class Image {
  @Prop({ type: Types.ObjectId, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, enum: ImageType, type: String })
  type: ImageType;
}

export const ImageSchema = SchemaFactory.createForClass(Image); 