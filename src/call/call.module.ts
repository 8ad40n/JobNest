
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CallController } from './call.controller';
import { CallService } from './call.service';

@Module({
  imports: [HttpModule],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule {}
