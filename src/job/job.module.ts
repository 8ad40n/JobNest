import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { JobProposal } from 'src/entities/jobProposal.entity';
import { User } from 'src/entities/user.entity';
import { UserSkill } from 'src/entities/userSkills.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JobSkill } from 'src/entities/jobSkill.entity';
import { Skill } from 'src/entities/skills.entity';

@Module({

  imports: [TypeOrmModule.forFeature([Job, User, JobProposal,JobSkill,Skill,UserSkill])],

  
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
