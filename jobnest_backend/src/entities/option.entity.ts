import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity('options')
export class Option extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    text:string;

    @Column()
    isCorrect:boolean;

    @ManyToOne(()=>Question, (question)=>question.options)
    question:Question
}