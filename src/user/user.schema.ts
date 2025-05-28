import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: Types.ObjectId, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  course: string;

  @Prop({ default: 0 })
  trophies: number;

  @Prop({ default: 0 })
  gold: number;

  @Prop({ default: 0 })
  elixir: number;
}

export const UserSchema = SchemaFactory.createForClass(User); 