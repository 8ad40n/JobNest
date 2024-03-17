import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("job")
export class Job{

    @PrimaryGeneratedColumn()
    jobID: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    postedBy: number;


    @Column()
    acceptedUserID: number;

    @Column()
    budget: number;

    @Column()
    duration: string;

    @Column()
    status: string;

    @CreateDateColumn()
    date: Date;



    
}