import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/entities/chat.entity';
import { Job } from 'src/entities/job.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), TypeOrmModule.forFeature([Job])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
