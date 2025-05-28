import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BattleLogDocument = BattleLog & Document;

@Schema({ timestamps: true })
export class BattleLog {
  @Prop({ type: Types.ObjectId, auto: true })
  id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  attackerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  defenderId: Types.ObjectId;

  @Prop({ required: true })
  result: 'win' | 'lose';

  @Prop({ required: true })
  trophies: number;

  @Prop({ required: true })
  gold: number;

  @Prop({ required: true })
  elixir: number;
}

export const BattleLogSchema = SchemaFactory.createForClass(BattleLog); 