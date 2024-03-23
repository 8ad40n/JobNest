import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/entities/bill.entitiy';
import { User } from 'src/entities/user.entity';
import { Job } from 'src/entities/job.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Bill, User, Job])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
