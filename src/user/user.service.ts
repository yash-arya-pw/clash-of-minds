import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(private readonly userModel: Model<User>) {}

  async getUser() {
    return this.userModel.find();
  }
}