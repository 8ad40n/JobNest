import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("payment")
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    transactionId: string;

    @Column('float')
    amount: number;

    @Column()
    status: string; // INITIATED, SUCCESS, FAILED, CANCELED
}
