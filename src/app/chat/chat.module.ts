import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from 'message/message.module';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';
// Мы подключаем MessageModule, чтобы сохранить/получить сообщения, UserModule и AuthModule — для доступа к пользователю и проверки токенов.

@Module({
  imports: [MessageModule, UserModule, AuthModule],
  providers: [ChatGateway],
})
export class ChatModule {}
