import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question, QuestionDocument } from './schemas/question.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async create(dto: CreateQuestionDto) {
    return this.questionModel.create(dto);
  }

  async findAll(): Promise<Question[] | null> {
    return this.questionModel.find().lean();
  }

  async findById(id: string): Promise<Question | null> {
    return this.questionModel.findById(id).lean();
  }

  async update(id: string, dto: UpdateQuestionDto) {
    return this.questionModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    return this.questionModel.findByIdAndDelete(id);
  }
}
