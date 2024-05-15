// chat.controller.ts
import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Chat } from 'src/entities/chat.entity';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @ApiBearerAuth('jwt')
  // @Post(':jobId')
  // async sendMessage(
  //   @Param('jobId') jobId: number,
  //   @Body() messageData: any,
  //   @Req() req: any,
  // ) {
  //   const senderId = req.user.id;
  //   const receiverId = messageData.receiverId;
  //   const message = messageData.message;
  //   return this.chatService.sendMessage(jobId, senderId, receiverId, message);
  // }

  // @ApiBearerAuth('jwt')
  // @Get(':jobId/history')
  // async getMessageHistory(
  //   @Param('jobId') jobId: number,
  //   @Req() req: any,
  // ) {
  //   const userId = req.user.id;
  //   return this.chatService.getMessageHistory(jobId, userId);
  // }

  @UseGuards(JwtAuthGuard)
  @Post(':jobId')
  async sendMessage(
    @Param('jobId') jobId: number,
    @Body() createChatDto: CreateChatDto,
    @Req() req: any,
  ): Promise<Chat[]> {
    const senderId = req.user.id; // Assuming req.user contains the logged-in user's information
    const { receiverId, message } = createChatDto;
    const result = await this.chatService.sendMessage(jobId, senderId, receiverId, message);
    const allMessages = await this.chatService.getMessageHistory(jobId);
    return allMessages;
  }
}