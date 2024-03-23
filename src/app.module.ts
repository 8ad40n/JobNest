import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BkashModule } from './bkash/bkash.module';
import { JobModule } from './job/job.module';

import { UsersModule } from './users/users.module';
// ChatCompletionApiModule


import { PaymentModule } from './payment/payment.module';
import { SkillModule } from './skill/skill.module';
import { ChatModule } from './chat/chat.module';
// ChatCompletionApiModule

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, JobModule, SkillModule, PaymentModule, BkashModule, ChatModule,UsersModule ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
