import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { JobProposal } from 'src/entities/jobProposal.entity';
import { JobSkill } from 'src/entities/jobSkill.entity';
import { Skill } from 'src/entities/skills.entity';
import { UserSkill } from 'src/entities/userSkills.entity';
import { Repository } from 'typeorm';
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
            .leftJoinAndSelect('job.jobSkills', 'jobSkill') // Perform a left join with JobSkill entity
            .leftJoinAndSelect('jobSkill.skill', 'skill') // Perform a left join with Skill entity
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
                'skill.name', // Select the skill name
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
        // Retrieve the logged-in user's skill IDs
        const userSkills = await this.userSkillRepository.find({
            where: { userID: loggedInUserId },
            select: ['skillID'],
        });

        // Extract skill IDs from userSkills
        const skillIds = userSkills.map(userSkill => userSkill.skillID);

        // Query jobs where at least one of the job's skills matches with any of the user's skills
        const matchingJobs = await this.jobRepository.createQueryBuilder('job')
            .innerJoin('job.jobSkills', 'jobSkill')
            .andWhere('jobSkill.skillID IN (:...skillIds)', { skillIds })
            .groupBy('job.jobID') // Group by job ID to avoid duplicate jobs
            .getMany();

        return matchingJobs;
    }
}

