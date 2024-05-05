import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobSkill } from "./jobSkill.entity";
@Entity("job")
export class Job{

    @PrimaryGeneratedColumn()
    jobID: number;

    @Column()
    title: string;

    @Column({nullable:true})
    description: string;


    @Column()
    postedBy:number;

    @Column({nullable:true})
    acceptedUserID: number;

    @Column()
    budget: number;

    @Column()
    duration: string;

    @Column({nullable:true})
    status: string;

    @CreateDateColumn()
    date: Date;


    @OneToMany(() => JobSkill, jobSkill => jobSkill.job)
    jobSkills: JobSkill[];



    
}