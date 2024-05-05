import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "./skills.entity";
import { User } from "./user.entity";
@Entity("userSkills")
export class UserSkill{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userID: number;

    @Column()
    skillID: number;


    @ManyToOne(() => User, user => user.userSkills)
    user: User;

    @ManyToOne(() => Skill, skill => skill.userSkills)
    skill: Skill;
}