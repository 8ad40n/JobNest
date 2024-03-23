import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('blog')
export class Blog extends BaseEntity
{
    @PrimaryGeneratedColumn({

    comment: 'The blog unique identifier',
    })

    id:number;

    @Column({
        nullable:true,
        
    })
    AuthorID:number;

    @Column({
        
        nullable:true,
    })
    title:string;

    @Column({
        nullable:true,
    })
    description:string;


    
}
