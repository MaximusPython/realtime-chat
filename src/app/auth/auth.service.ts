import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  // Метод generateToken создаёт и возвращает JWT-токен, который потом можно использовать для аутентификации пользователя.

  async generateToken(userId: string) {
    const payload = { sub: userId }; //sub — это стандартное поле, означающее "subject" — кому принадлежит токен.  этот токен принадлежит пользователю с таким ID.

    return this.jwtService.signAsync(payload); // Этот метод подписывает (encrypts) payload секретным ключом
  }
}
