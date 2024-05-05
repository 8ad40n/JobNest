import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserSkill } from './userSkills.entity';
@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    name: string;
    
    @Column({unique: true, nullable:false})
    email: string;

    @Column({nullable:false})
    password: string;

    @Column({nullable:true, unique:false})
    type: string;

    @Column({nullable:true})
    subscriptionStatus: string;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;


    // @BeforeInsert()
    // async HashPassword() {
    //   this.password = await bcrypt.hash(this.password, 12);
    // }

    @OneToMany(() => UserSkill, userSkill => userSkill.user)
    userSkills: UserSkill[];
    feedbackGiven: any;
    feedbackReceived: any;
    
    


}