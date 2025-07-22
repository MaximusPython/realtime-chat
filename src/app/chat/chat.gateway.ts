import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { MessageService } from '../message/message.service';
import { Socket, Server } from 'socket.io';
import { Injectable, UnauthorizedException } from '@nestjs/common';

interface JwtPayload {
  sub: string; // userId
}

@WebSocketGateway({ cors: true })
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly jwtService: JwtService,
    private readonly messageService: MessageService
  ) {}

  // При подключении клиента по WebSocket
  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (!token) throw new UnauthorizedException('Токен не действителен');

      const payload = this.jwtService.verify<JwtPayload>(token);
      (client as any).userId = payload.sub; // сохраняем userId в клиенте

      console.log(`Пользоватеь подключен: ${payload.sub}`);
    } catch (error) {
      console.log('Ошибка подключения');
      client.disconnect();
    }
  }

  // При отключении клиента
  handleDisconnect(client: Socket) {
    console.log(`Пользователь отключен: ${(client as any).userId}`);
  }

  // Обработка входящего сообщения
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { roomId: string; text: string },
    @ConnectedSocket() client: Socket
  ) {
    const userId = (client as any).userId;
    if (!userId) throw new UnauthorizedException();

    // Сохраняем сообщение в базе
    const message = await this.messageService.create(
      userId,
      data.roomId,
      data.text
    );

    // Отправляем сообщение всем в комнате и себе
    this.server.to(data.roomId).emit('message', {
      _id: message._id,
      text: message.text,
      author: { userId },
      roomId: data.roomId,
    });
  }

  // Клиент может подключиться к комнате (join)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket
  ) {
    client.join(roomId);
    console.log(`User ${(client as any).userId} joined room ${roomId}`);
  }

  // Клиент может выйти из комнаты (leave)
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket
  ) {
    client.leave(roomId);
    console.log(`User ${(client as any).userId} left room ${roomId}`);
  }
}
