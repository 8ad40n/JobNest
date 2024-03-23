import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('package')
export class Package{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    type: string;

    @Column()
    validity_time: number;
}