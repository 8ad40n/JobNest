// any database activity will be done by quiz repository & data will be fetch by the service
// and service is something which the controller interacts with it
//controller never really directly interect with the repository but services

import { Quiz } from "src/entities/quiz.entity";
//import { EntityRepository, Repository } from "typeorm";
import { EntityRepository, Repository } from 'typeorm';


//@EntityRepository(Quiz)
export class QuizReository extends Repository<Quiz>
{

} 





