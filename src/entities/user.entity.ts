import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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


    
    @BeforeInsert()
    async HashPassword() {
      this.password = await bcrypt.hash(this.password, 12);
    }
}