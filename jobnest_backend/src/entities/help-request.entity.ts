

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HelpRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column('text')
  description: string;

  @Column()
  requestedById: number;

  @Column({ nullable: true })
  solvedById: number;
}
