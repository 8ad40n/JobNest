import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { JobProposal } from 'src/entities/jobProposal.entity';
import { JobSkill } from 'src/entities/jobSkill.entity';
import { Skill } from 'src/entities/skills.entity';
import { User } from 'src/entities/user.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([JobProposal]), TypeOrmModule.forFeature([JobSkill]), TypeOrmModule.forFeature([Skill])],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
