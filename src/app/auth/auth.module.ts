import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Module({})
export class AuthModule {
  import: [UserService];
}
