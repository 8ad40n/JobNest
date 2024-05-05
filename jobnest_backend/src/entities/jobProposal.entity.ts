import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("jobProposal")
export class JobProposal{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    jobID: number;

    @Column()
    userID: number;

    @Column()
    budget: number;

    @Column()
    duration: string;

    @Column()
    coverLetter: string;

}