import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // — это регистрация Mongoose-модели внутри модуля.
  ],
  providers: [UserService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
