import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { JobProposal } from 'src/entities/jobProposal.entity';
import { JobSkill } from 'src/entities/jobSkill.entity';
import { Skill } from 'src/entities/skills.entity';
import { UserSkill } from 'src/entities/userSkills.entity';
import { IsNull, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { JobProposalDto } from './dto/jobProposal.dto';

@Injectable()
export class JobService {
    constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobProposal) private readonly jobProposalRepository: Repository<JobProposal>,
    @InjectRepository(Skill) private readonly skillRepository: Repository<Skill>,
    @InjectRepository(JobSkill) private readonly jobSkillRepository: Repository<JobSkill>,
    @InjectRepository(UserSkill) private readonly userSkillRepository: Repository<UserSkill>){}

    // async jobPost(data: any): Promise<Job> {
    //     return this.jobRepository.save(data);
    // }
    async getJobsWithAcceptedProposals(loggedInUserId: number): Promise<Job[]> {
        // Find all jobs where acceptedUserID is not null
        const jobsWithAcceptedProposals = await this.jobRepository.find({
          where: { acceptedUserID: Not(IsNull()) },
        });
    
        // Filter jobs where postedBy is the logged-in user
        const filteredJobs = jobsWithAcceptedProposals.filter(
          (job) => job.postedBy === loggedInUserId,
        );
    
        return filteredJobs;
      }
    
      async getJobProposalsByJobIds(
        jobIds: number[],
        loggedInUserId: number,
      ): Promise<JobProposal[]> {
        // Find all job proposals where jobID is in jobIds array and postedBy is logged-in user
        return this.jobProposalRepository.find({
          where: {
            userID: loggedInUserId,
            jobID: MoreThanOrEqual(Math.min(...jobIds)),
          },
        });
      }

    async jobs(): Promise<Job[]> {
        return this.jobRepository.find({
            order: {
              date: 'DESC' 
            }
          });
    }
    
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
        // return this.jobRepository.find({ 
        //     where: { 
        //         title: Like(`%${keyword}%`),
        //         acceptedUserID: null,
        //         status: null
        //     },
        //     select: ['jobID', 'title', 'description', 'postedBy', 'budget', 'duration', 'date', 'status'] 
        // });

        return this.jobRepository
            .createQueryBuilder('job')
            .leftJoinAndSelect('job.jobSkills', 'jobSkill') 
            .leftJoinAndSelect('jobSkill.skill', 'skill') 
            .where('job.title LIKE :keyword', { keyword: `%${keyword}%` })
            .andWhere('job.acceptedUserID IS NULL')
            .andWhere('job.status IS NULL')
            .select([
                'job.jobID', 
                'job.title', 
                'job.description', 
                'job.postedBy', 
                'job.budget', 
                'job.duration', 
                'job.date', 
                'job.status',
                'skill.name',
            ])
            .getMany();
    }

    async createJobProposal(proposalDto: JobProposalDto): Promise<JobProposal> {
        const jobProposal = this.jobProposalRepository.create(proposalDto);
        return this.jobProposalRepository.save(jobProposal);
      }


    async getPostedJobs(userId: number): Promise<Job[]> {
        return this.jobRepository.find({ where: { postedBy: userId } });
    }

    async getJobProposals(jobId: number, loggedInUserId: number): Promise<JobProposal[]> {
        const job = await this.jobRepository.findOne({where:{jobID: jobId, acceptedUserID: null}});
        if (!job) {
            throw new NotFoundException('Job not found');
        }

        if (job.postedBy !== loggedInUserId) {
            throw new UnauthorizedException('You are not authorized to view job proposals for this job');
        }

        return this.jobProposalRepository.find({ where: { jobID: jobId } });
    }


    async acceptJobProposal(jobId: number, proposalId: number, loggedInUserId: number) {
        const job = await this.jobRepository.findOne({ where: { jobID: jobId } });
        if (!job) {
            throw new NotFoundException('Job not found');
        }
        if (job.postedBy !== loggedInUserId) {
            throw new UnauthorizedException('You are not authorized to accept job proposals for this job');
        }

        const jobProposal = await this.jobProposalRepository.findOne({where: {id:proposalId}});
        if (!jobProposal) {
            throw new NotFoundException('Job proposal not found');
        }

        job.acceptedUserID = jobProposal.userID;
        return await this.jobRepository.save(job);
    }



    async getInterestBasedJobs(loggedInUserId: number): Promise<Job[]> {
        const userSkills = await this.userSkillRepository.find({
            where: { userID: loggedInUserId },
            select: ['skillID'],
        });
    
        const skillIds = userSkills.map(userSkill => userSkill.skillID);
    
        const matchingJobs = await this.jobRepository.createQueryBuilder('job')
            .innerJoin('job.jobSkills', 'jobSkill')
            .andWhere('jobSkill.skillID IN (:...skillIds)', { skillIds })
            .groupBy('job.jobID')
            .getMany();
    
        const allJobs = await this.jobRepository.find();
    
        const prioritizedJobs = matchingJobs.concat(allJobs.filter(job => !matchingJobs.includes(job)));
    
        return prioritizedJobs;
    }
    
}

