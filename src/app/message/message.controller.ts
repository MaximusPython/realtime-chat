import { MessageService } from './message.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':roomId')
  async getMessages(@Param('roomId') roomId: string) {
    return this.messageService.findByRoom(roomId);
  }
}
