import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { JobSkill } from 'src/entities/jobSkill.entity';
import { Skill } from 'src/entities/skills.entity';
import { User } from 'src/entities/user.entity';
import { UserSkill } from 'src/entities/userSkills.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(JobSkill) private readonly jobSkillRepository: Repository<JobSkill>,
    @InjectRepository(Skill) private readonly skillRepository: Repository<Skill>,
    @InjectRepository(UserSkill) private readonly userSkillRepository: Repository<UserSkill>){}


    async jobPost(data: any, userId: number){
        const user = await this.userRepository.findOne({where:{id:userId}});

        if (user && user.type === 'admin') 
        {
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
        else{
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        
    }





    async removeJob(id: number, userId: number) {

        const user = await this.userRepository.findOne({where:{id:userId}});
        if (!user || user.type !== 'admin') {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const job = await this.jobRepository.findOne({ where: { jobID: id } });
        if (!job) {
            throw new NotFoundException('Job not found');
        }
        await this.jobSkillRepository.delete({ jobID: id });
        await this.jobRepository.remove(job);

        return "Success";
    }

    async removeUser(id: number, userId: number) {

        const user = await this.userRepository.findOne({where:{id:userId}});
        if (!user || user.type !== 'admin') {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const u = await this.userRepository.findOne({ where: { id:id } });
        if (!u) {
            throw new NotFoundException('User not found');
        }
        await this.userSkillRepository.delete({ userID: id });
        await this.userRepository.remove(u);

        return "Success";
    }
}
