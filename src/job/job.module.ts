import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { JobProposal } from 'src/entities/jobProposal.entity';
import { JobSkill } from 'src/entities/jobSkill.entity';
import { Skill } from 'src/entities/skills.entity';
import { User } from 'src/entities/user.entity';
import { UserSkill } from 'src/entities/userSkills.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([JobProposal]), TypeOrmModule.forFeature([JobSkill]), TypeOrmModule.forFeature([Skill]), TypeOrmModule.forFeature([UserSkill])],
  controllers: [JobController],
  providers: [JobService]
})

 export class JobModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('job');
  }
}