import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobSkill } from "./jobSkill.entity";
@Entity("skills")
export class Skill{

    @PrimaryGeneratedColumn({})
    skillID: number;

    @Column({nullable:false})
    name: string;

    @OneToMany(() => JobSkill, jobSkill => jobSkill.skill) 
    jobSkills: JobSkill[];

}