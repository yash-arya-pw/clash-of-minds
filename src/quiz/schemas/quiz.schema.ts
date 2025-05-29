import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ type: [Types.ObjectId], ref: 'Question', required: true })
  questions: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
