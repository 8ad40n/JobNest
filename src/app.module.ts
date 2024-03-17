import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatCompletionApiModule } from './chat-completion-api/chat-completion-api.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, ChatCompletionApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
