import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizReository } from '../quiz.repository';
import { createQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(@InjectRepository(Quiz) private quizRepository:Repository<Quiz>){}
    getAllQuiz()
    {
        return [1,2,3,'From the service']
    }

    async getQuizById(id: number)
    {
      return await this.quizRepository.findOne({where:{id:id}});
      //return await this.quizRepository.find(id, {relations:['questions']});
    }

    async createNewQuiz(quiz:createQuizDto )
    {
      return await this.quizRepository.save(quiz);

    }
}
