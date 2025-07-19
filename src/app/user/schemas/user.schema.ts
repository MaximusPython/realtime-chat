import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// создаем схему mongo

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  passwordHash: string;

  @Prop({ required: true, unique: true })
  email: string;
}

// Фабрика создаёт mongoose-схему на основе класса

export const UserSchema = SchemaFactory.createForClass(User);
