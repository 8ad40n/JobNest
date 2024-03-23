import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('subscription')
export class Subscription{
    @PrimaryGeneratedColumn()
    subscription_id: number;

    @Column()
    subscription_type: string;

    @Column()
    subscription_status: string;

    @Column()
    user_id: number;

    @Column()
    purchase_date: Date;

    @Column()
    expire_date: Date;

    @Column()
    package_id: number;

}