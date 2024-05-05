import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { createQuizDto } from 'src/quiz/dto/create-quiz.dto';


@Controller('quiz')
export class QuizController 
{
    constructor(private quizService:QuizService){}

    @Get('/')
    getAllQuiz(){
        //return [1,2,3];
        return this.quizService.getAllQuiz();
    }
@Get('/:id')
    async getQuizById(@Param('id',ParseIntPipe)id:number)
{
    //return id;
    return await this.quizService.getQuizById(id);
}

    @Post('/create')
    @UsePipes(ValidationPipe)

    async createQuiz(@Body()quizData:createQuizDto){
        //return {data:quizData};
        return await this.quizService.createNewQuiz(quizData);
    }
}
