import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { JobProposal } from 'src/entities/jobProposal.entity';
import { Like, Repository } from 'typeorm';
import { JobProposalDto } from './dto/jobProposal.dto';

@Injectable()
export class JobService {
    constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobProposal) private readonly jobProposalRepository: Repository<JobProposal>){}

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

    async createJobProposal(proposalDto: JobProposalDto): Promise<JobProposal> {
        const jobProposal = this.jobProposalRepository.create(proposalDto);
        return this.jobProposalRepository.save(jobProposal);
      }
}

