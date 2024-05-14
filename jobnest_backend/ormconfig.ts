import { Bill } from 'src/entities/bill.entitiy';
import { Blog } from 'src/entities/blog.entity';
import { Chat } from 'src/entities/chat.entity';
import { Feedback } from 'src/entities/feedback.entity';
import { HelpRequest } from 'src/entities/help-request.entity';
import { Job } from 'src/entities/job.entity';
import { JobProposal } from 'src/entities/jobProposal.entity';
import { JobSkill } from 'src/entities/jobSkill.entity';
import { Package } from 'src/entities/package.entity';
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
  password: '12345',
  entities: [User,Skill,UserSkill,Job,JobProposal,JobSkill, Payment, Chat, Bill, Package, Subscription, Blog,Feedback, HelpRequest],
  synchronize: true,
};


export default config;