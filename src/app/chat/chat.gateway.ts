import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guards';
import { MessageService } from 'message/message.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatGateway {}
