

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpRequest } from 'src/entities/help-request.entity';
import { HelpRequestService } from './help-request.service';
import { HelpRequestController } from './help-request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HelpRequest])],
  providers: [HelpRequestService],
  controllers: [HelpRequestController],
})
export class HelpRequestModule {}
