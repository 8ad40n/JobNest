import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BkashModule } from './bkash/bkash.module';
import { JobModule } from './job/job.module';
import { PaymentModule } from './payment/payment.module';
import { SkillModule } from './skill/skill.module';
import { ChatModule } from './chat/chat.module';
import { AppGateway } from './app/app.gateway';
import { PayModule } from './pay/pay.module';
// ChatCompletionApiModule

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, JobModule, SkillModule, PaymentModule, BkashModule, ChatModule, PayModule],
  controllers: [AppController],
  providers: [AppService, AppGateway]
})
export class AppModule {}
