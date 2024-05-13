import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/entities/bill.entitiy';
import { Job } from 'src/entities/job.entity';
import { User } from 'src/entities/user.entity';
import { LoggerMiddleware } from './logger.middleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Subscription } from 'src/entities/subscription.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Bill, User, Job, Subscription])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users');
  }
}