import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { PayController } from './pay.controller';
import { PayService } from './pay.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [PayController],
  providers: [PayService],

})
export class PayModule {}
