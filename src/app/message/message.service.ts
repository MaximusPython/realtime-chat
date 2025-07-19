import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message> //В конструктор внедряется модель messageModel — это класс, через который мы делаем запросы к коллекции сообщений.
  ) {}
  async create(authorId: string, roomId: string, text: string) {
    const message = new this.messageModel({
      author: new Types.ObjectId(authorId), // преобразуем строку id в ObjectId
      roomId,
      text,
    });
    return message.save(); // сохраняем в бд
  }

  async findByRoom(roomId: string) {
    return this.messageModel
      .find({ roomId }) // фильтруем по roomId
      .populate('author', 'username') // подгружаем поле username из автора (User)
      .sort({ createdAt: 1 }) // сортируем по дате создания по возрастанию (чтобы выводить по порядку)
      .exec(); // выполняем запрос
  }
}
