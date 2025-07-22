import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from '../../../../src/app/message/message.module';
import { AuthModule } from '../../../../src/app/auth/auth.module';
import { UserModule } from '../../../../src/app/user/user.module';
import { ChatModule } from '../../../../src/app/chat/chat.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-chat'),
    MessageModule,
    UserModule,
    ChatModule,
    AuthModule,
    JwtModule.register({
      // создали секрет с продолжительностью 1 час жизни
      secret: 'supersecretkey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
