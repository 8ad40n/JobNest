import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("skills")
export class Skill{

    @PrimaryGeneratedColumn({})
    skillID: number;

    @Column({nullable:false})
    name: string;

}