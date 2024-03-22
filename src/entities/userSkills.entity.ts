import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("userSkills")
export class UserSkill{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userID: number;

    @Column()
    skillID: number;
    
}