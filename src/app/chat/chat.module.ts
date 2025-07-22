import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from '../message/message.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

// Мы подключаем MessageModule, чтобы сохранить/получить сообщения, UserModule и AuthModule — для доступа к пользователю и проверки токенов.

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET || 'SECRET_KEY' }), // jwt
    MessageModule,
    UserModule,
    AuthModule,
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
