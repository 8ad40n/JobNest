import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ChatCompletionApiService } from './chat-completion-api.service';
import { GetChatCompletionAnswerInputDTO } from './dto/chat-completion-answer.dto';

@Controller('chat-completion-api')
export class ChatCompletionApiController {
  constructor(private readonly service: ChatCompletionApiService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  getChatCompletionMessage(
    @Body(new ValidationPipe({ transform: true }))
    data: GetChatCompletionAnswerInputDTO,
  ) {
    return this.service.getAiModelAnswer(data);
  }
}
