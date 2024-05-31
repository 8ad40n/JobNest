import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app/app.gateway';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { ChatCompletionApiModule } from './chat-completion-api/chat-completion-api.module';
import { ChatModule } from './chat/chat.module';
import { FeedbackModule } from './feedback/feedback.module';
import { HelpRequestModule } from './help-request/help-request.module';
import { JobModule } from './job/job.module';
import { PackageModule } from './package/package.module';
import { PayModule } from './pay/pay.module';
import { PaymentModule } from './payment/payment.module';
import { SkillModule } from './skill/skill.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { UsersModule } from './users/users.module';
// ChatCompletionApiModule

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, JobModule, SkillModule, PaymentModule, ChatModule, PayModule, SubscriptionModule,UsersModule,PackageModule, BlogModule, FeedbackModule, HelpRequestModule, SwaggerModule, AdminModule, ChatCompletionApiModule],
  controllers: [AppController],
  providers: [AppService, AppGateway]
})
export class AppModule {}
