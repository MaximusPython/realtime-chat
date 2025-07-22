import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable() // создаем jwt
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(' Неверный email или пароль');
    }

    const token = await this.generateToken(user.id);

    return {
      access_token: token,
    };
  }

  // Регистрация пользователя
  async register(dto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Такой пользователь уже есть');
    }

    const user = await this.userService.create(
      dto.email,
      dto.username,
      dto.password
    );

    const token = await this.generateToken(user.id);

    return {
      access_token: token, // возвращаем токен сформированный
    };
  }

  // Метод generateToken создаёт и возвращает JWT-токен, который потом можно использовать для аутентификации пользователя.
  private async generateToken(userId: string) {
    const payload = { sub: userId }; //sub — это стандартное поле, означающее "subject" — кому принадлежит токен.  этот токен принадлежит пользователю с таким ID.

    return this.jwtService.signAsync(payload); // Этот метод подписывает (encrypts) payload секретным ключом
  }
}
