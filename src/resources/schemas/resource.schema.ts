import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ResourceDocument = Resource & Document;

@Schema({ timestamps: true })
export class Resource {
  @Prop({ type: Types.ObjectId, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  health: number;

  @Prop({ type: Types.ObjectId, required: true })
  imageId: Types.ObjectId;

  @Prop({ required: true })
  level: number;

  @Prop({ required: true })
  cost: number;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource); 