import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // super({ … }) настраивает правила извлечения и проверки токена.

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлекаем токен из заголовка Authorization: Bearer <token>
      ignoreExpiration: false, //  токен считается недействительным сразу после окончания срока действия.
      secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY', // Секретный ключ для проверки подписи
    });
  }

  async validate(payload: any) {
    // Метод вызывается автоматически, если токен валидный

    // payload — это объект, который мы подписывали (например, { sub: userId })
    // Здесь можно проверить пользователя, загрузить из БД и вернуть данные, которые будут доступны в request.user  в контроллере и Guard'ах
    return { userId: payload.sub };
  }
}
