import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { OptionService } from "../services/option.service";
import { QuestionService } from "../services/question.service";
import { createOptionDto } from "../dto/create-option.dto";

@Controller('question/option')
export class OptionController
{
    constructor(private optionService: OptionService, 
        private questionService:QuestionService){}


        @Post('')
        @UsePipes(ValidationPipe)
        async saveOptionToQuestion(@Body()createOption: createOptionDto)
        {
            const question=await this.questionService.findQuestionById(createOption.questionId)
            return {question,createOption};
        }

}