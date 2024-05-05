import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { createQuestionDto } from "../dto/createquestion.dto";
import { QuestionService } from "../services/question.service";
import { Question } from "src/entities/question.entity";
import { QuizService } from "../services/quiz.service";

@Controller('question')

export class QuestionController
{

    constructor(private questionService : QuestionService, private quizService :QuizService){}
    
    @Post('add')
    @UsePipes(ValidationPipe)
    async saveQuestion(@Body() question:createQuestionDto)
    {
        const quiz=await this.quizService.getQuizById(question.quizId)

        return await this.questionService.createQuestion(question,quiz);
    }
}