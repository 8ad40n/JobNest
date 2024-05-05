import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";
import { Skill } from "./skills.entity";
@Entity("jobSkill")
export class JobSkill{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    jobID: number;

    @ManyToOne(() => Job, job => job.jobSkills) 
    job: Job;

    @Column()
    skillID: number;


    @ManyToOne(() => Skill, skill => skill.jobSkills) 
    skill: Skill;


}