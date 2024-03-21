import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { User } from 'src/entities/user.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), TypeOrmModule.forFeature([User])],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
