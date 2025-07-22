import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// Это сервисный класс, в котором мы:
// создаём нового пользователя (с хешированием пароля),
// находим пользователя по email (например, при логине).
// Всё это будет работать через подключённую Mongoose модель User, которую мы ранее создали.

@Injectable()
export class UserService {
  //говорит Nest'у: "возьми Mongoose модель с именем User".
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(email: string, username: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10); // хешируем пароль

    const createUser = new this.userModel({
      email,
      username,
      passwordHash,
    });

    return createUser.save(); // Сохраняем в MongoDB через .save().
  }

  async findByEmail(email: string) {
    // Выполняем Mongo-запрос: ищет пользователя по email.

    return this.userModel.findOne({ email }).exec();
  }
}
