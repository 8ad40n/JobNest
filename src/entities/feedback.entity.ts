

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("feedback")
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  rating: number;

  @Column('text')
  comment: string;

  @Column({nullable:true})
  givenById: number;
  @Column({nullable:true})
  receivedById: number;

  // @ManyToOne(() => User, user => user.feedbackGiven)
  // givenBy: User;

  // @ManyToOne(() => User, user => user.feedbackReceived)
  // receivedBy: User;
}

