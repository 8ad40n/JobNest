import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
// ChatCompletionApiModule

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, JobModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
