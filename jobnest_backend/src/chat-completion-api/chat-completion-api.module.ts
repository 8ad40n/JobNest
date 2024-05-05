import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChatCompletionApiController } from './chat-completion-api.controller';
import { ChatCompletionApiService } from './chat-completion-api.service';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  providers: [ChatCompletionApiService],
  controllers: [ChatCompletionApiController]
})
export class ChatCompletionApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('chat-completion-api');
  }
}
