import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from 'src/entities/skills.entity';
import { User } from 'src/entities/user.entity';
import { UserSkill } from 'src/entities/userSkills.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SkillService {
    constructor(@InjectRepository(Skill) private readonly skillRepository: Repository<Skill>,
    @InjectRepository(UserSkill) private readonly userSkillRepository: Repository<UserSkill>,
    @InjectRepository(User) private readonly userRepository: Repository<User>){}


    async addUserSkill(userID: number, skillName: string): Promise<UserSkill> {

        let skill = await this.skillRepository.findOne({ where: { name: skillName } });

        if (!skill) {
            skill = await this.skillRepository.save({ name: skillName });
        }
        const existingUserSkill = await this.userSkillRepository.findOne({ where: { userID, skillID: skill.skillID } });

        if (!existingUserSkill) {
            const userSkill = this.userSkillRepository.create({ userID, skillID: skill.skillID });
            return this.userSkillRepository.save(userSkill);
        }

        return existingUserSkill;
    }


    // async getUserSkillNames(userID: number) {
    //     const user= this.userSkillRepository.find({select: {
    //         skillID: true
    //     },
    //     where:{userID: userID}});
    //     return user;
    // }

    async getUserSkillNames(userID: number): Promise<string[]> {
        const userSkills = await this.userSkillRepository.find({
            select: ['skillID'],
            where: { userID },
        });

        if (!userSkills || userSkills.length === 0) {
            return [];
        }

        const uniqueSkillIDs = Array.from(new Set(userSkills.map(userSkill => userSkill.skillID)));

        const skills = await this.skillRepository.find({
            select: ['name'],
            where: { skillID: In(uniqueSkillIDs) }, 
        });

        const skillNames = skills.map(skill => skill.name);

        return skillNames;
    }
}
