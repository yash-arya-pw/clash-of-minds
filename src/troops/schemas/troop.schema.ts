import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TroopDocument = Troop & Document;

@Schema({ timestamps: true, collection: 'troops' })
export class Troop {
  @Prop({ type: Types.ObjectId, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  attack: number;

  @Prop({ required: true })
  level: number;

  @Prop({ type: Types.ObjectId, required: true })
  imageId: Types.ObjectId;
}

export const TroopSchema = SchemaFactory.createForClass(Troop); 