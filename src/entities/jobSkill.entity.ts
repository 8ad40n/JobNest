import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("jobSkill")
export class JobSkill{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    jobID: number;

    @Column()
    skillID: number;


}