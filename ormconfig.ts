
import { Bill } from 'src/entities/bill.entitiy';

import { Package } from 'src/entities/package.entity';

import { Chat } from 'src/entities/chat.entity';
import { Job } from 'src/entities/job.entity';
import { JobProposal } from 'src/entities/jobProposal.entity';
import { JobSkill } from 'src/entities/jobSkill.entity';
import { Payment } from 'src/entities/payment.entity';

import { Skill } from 'src/entities/skills.entity';
import { Subscription } from 'src/entities/subscription.entity';
import { User } from 'src/entities/user.entity';
import { UserSkill } from 'src/entities/userSkills.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'JobNest',
  host: 'localhost',
  port: 5432,
  username: 'postgres',

  password: '1234',
  entities: [
    User,
    Skill,
    UserSkill,
    Job,
    JobProposal,
    JobSkill, 
    Bill,
    Subscription,
    Package,Payment, Chat 
  ],

  synchronize: true,
};

export default config;