import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz, QuizDocument } from './schemas/quiz.schema';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async create(dto: CreateQuizDto) {
    return this.quizModel.create(dto);
  }

  async findById(id: string) {
    return this.quizModel.findById(id).lean();
  }

  async findAll() {
    return this.quizModel.find().lean();
  }

  async update(id: string, dto: UpdateQuizDto) {
    return this.quizModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    return this.quizModel.findByIdAndDelete(id);
  }
}
