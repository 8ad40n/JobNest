import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app/app.gateway';
import { AuthModule } from './auth/auth.module';
import { BkashModule } from './bkash/bkash.module';
import { BlogModule } from './blog/blog.module';
import { ChatModule } from './chat/chat.module';
import { JobModule } from './job/job.module';
import { PackageModule } from './package/package.module';
import { PayModule } from './pay/pay.module';
import { PaymentModule } from './payment/payment.module';
import { SkillModule } from './skill/skill.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { UsersModule } from './users/users.module';
// ChatCompletionApiModule

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, JobModule, SkillModule, PaymentModule, BkashModule, ChatModule, PayModule, SubscriptionModule,UsersModule,PackageModule, BlogModule],
  controllers: [AppController],
  providers: [AppService, AppGateway]
})
export class AppModule {}
