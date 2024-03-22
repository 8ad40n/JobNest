import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { SkillModule } from './skill/skill.module';
// ChatCompletionApiModule

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, JobModule, SkillModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
