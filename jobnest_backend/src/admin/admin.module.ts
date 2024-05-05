import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Job } from 'src/entities/job.entity';
import { JobSkill } from 'src/entities/jobSkill.entity';
import { Skill } from 'src/entities/skills.entity';
import { User } from 'src/entities/user.entity';
import { UserSkill } from 'src/entities/userSkills.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job, User, JobSkill, Skill, UserSkill])],
  providers: [AdminService, JwtAuthGuard],
  controllers: [AdminController]
})
export class AdminModule {}

