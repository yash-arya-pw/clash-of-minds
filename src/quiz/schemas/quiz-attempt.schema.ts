import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type QuizAttemptDocument = QuizAttempt & Document;

@Schema({ timestamps: true })
export class QuizAttempt {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Quiz', required: true })
  quiz: Types.ObjectId;

  @Prop({
    type: [
      {
        question: { type: Types.ObjectId, ref: 'Question', required: true },
        selectedAnswerIndex: { type: Number, required: true },
        isCorrect: { type: Boolean, default: false },
      },
    ],
    default: [],
  })
  responses: {
    question: Types.ObjectId;
    selectedAnswerIndex: number;
    isCorrect: boolean;
  }[];

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop()
  startedAt?: Date;

  @Prop()
  completedAt?: Date;
}

export const QuizAttemptSchema = SchemaFactory.createForClass(QuizAttempt);
