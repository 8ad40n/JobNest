import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}