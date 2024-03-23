import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('bill')
export class Bill{
    @PrimaryGeneratedColumn()
    billId: number;

    @Column()
    amount: number;

    @Column()
    status: string;

    @Column()
    sendUserId: number;

    @Column()
    recievedUserId: number;

    @Column()
    transaction: string;
}