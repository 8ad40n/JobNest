import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class JobService {
    constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>){}

    async jobPost(data: any): Promise<Job> {
        return this.jobRepository.save(data);
    }

    async searchJobsByTitle(keyword: string): Promise<Job[]> {
        return this.jobRepository.find({ 
            where: { 
                title: Like(`%${keyword}%`),
                acceptedUserID: null,
                status: null
            },
            select: ['jobID', 'title', 'description', 'postedBy', 'budget', 'duration', 'date', 'status'] 
        });
    }
}

