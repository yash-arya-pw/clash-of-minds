import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum QuestionType {
  MCQ = 'MCQ',
}

export type QuestionDocument = Question & Document;

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  text: string;

  @Prop({ enum: QuestionType, default: QuestionType.MCQ })
  type: QuestionType;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ required: true })
  correctAnswerIndex: number;

  @Prop({ type: Types.ObjectId, ref: 'Quiz' })
  quiz: Types.ObjectId;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
