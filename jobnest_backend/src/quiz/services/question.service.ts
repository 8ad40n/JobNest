import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "src/entities/question.entity";
import { Repository} from "typeorm";
import { createQuestionDto } from "../dto/createquestion.dto";
import { Quiz } from "src/entities/quiz.entity";




@Injectable()
export class QuestionService
  {
  constructor(@InjectRepository(Question) private questionRepository:Repository<Question>){}
   /* getAllQuiz()
    {
        return [1,2,3,'From the service']
    }*/
   async findQuestionById(id: number)
   {
    //return await this.questionRepository.findOne(id, {relations:['quiz']})
    return await this.questionRepository.findOne({where:{id:id}});
 

   }

   async createQuestion(question:createQuestionDto, quiz:Quiz) 
   {
        const newQuestion= await this.questionRepository.save({question:question.question});
        
      quiz.questions=[...quiz.questions, newQuestion];
       await quiz.save();


        return newQuestion;
   }
   
}
