import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {
    constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>){}

    async jobPost(data: any): Promise<Job> {
        return this.jobRepository.save(data);
    }
}

