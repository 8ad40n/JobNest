import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { JobProposal } from 'src/entities/jobProposal.entity';
import { JobSkill } from 'src/entities/jobSkill.entity';
import { Skill } from 'src/entities/skills.entity';
import { Like, Repository } from 'typeorm';
import { JobProposalDto } from './dto/jobProposal.dto';

@Injectable()
export class JobService {
    constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobProposal) private readonly jobProposalRepository: Repository<JobProposal>,
    @InjectRepository(Skill) private readonly skillRepository: Repository<Skill>,
    @InjectRepository(JobSkill) private readonly jobSkillRepository: Repository<JobSkill>){}

    // async jobPost(data: any): Promise<Job> {
    //     return this.jobRepository.save(data);
    // }

    async jobPost(data: any): Promise<Job> {
        const job = await this.jobRepository.save(data);

        const skillNames: string[] = data.skills; 
        const jobSkills = [];

        for (const skillName of skillNames) {
            let skill = await this.skillRepository.findOne({ where:{name: skillName} });

    
            if (!skill) {
                skill = this.skillRepository.create({ name: skillName });
                await this.skillRepository.save(skill);
            }

            const jobSkill = this.jobSkillRepository.create({
                jobID: job.jobID, 
                skillID: skill.skillID,
            });

            jobSkills.push(jobSkill);
        }

        await this.jobSkillRepository.save(jobSkills);

        return job;
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

