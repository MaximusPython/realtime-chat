import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// наша схема сообщения

@Schema({ timestamps: true }) // // timestamps автоматически добавит поля createdAt и updatedAt
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;
  // author — это ObjectId, который ссылается на документ пользователя (реф на коллекцию User).

  @Prop({ type: String, required: true })
  roomId: string; // roomId — идентификатор комнаты, куда отправлено сообщение.

  @Prop({ type: String, required: true })
  text: string; // text — сам текст сообщения.
}
export const MessageSchema = SchemaFactory.createForClass(Message);
