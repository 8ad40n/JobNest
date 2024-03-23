// chat.controller.ts
import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ChatService } from './chat.service';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post(':jobId')
  async sendMessage(
    @Param('jobId') jobId: number,
    @Body() messageData: any,
    @Req() req: any,
  ) {
    const senderId = req.user.id;
    const receiverId = messageData.receiverId;
    const message = messageData.message;
    return this.chatService.sendMessage(jobId, senderId, receiverId, message);
  }

  @Get(':jobId/history')
  async getMessageHistory(
    @Param('jobId') jobId: number,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.chatService.getMessageHistory(jobId, userId);
  }
}