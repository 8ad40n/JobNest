import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { BlogService } from './blog.service';
import { createBlogDto } from './dto/create-blog.dto';




@Controller('blog')
export class BlogController 
{
    constructor(private quizService:BlogService){}

   /* @Get('/')
    getAllQuiz(){
        //return [1,2,3];
        return this.quizService.getAllQuiz();
    }*/


    @UseGuards(JwtAuthGuard)
    @Post("add")
    @UsePipes(ValidationPipe)

    async createQuiz(@Body() quizData:createBlogDto, @Req() req){
        
        const user = req.user.id;
        return await this.quizService.createNewQuiz(quizData, user);
    }


    @Get("show")
    @UsePipes(ValidationPipe)

    async showBlogs(){
        //return {data:quizData};
        return await this.quizService.showBlog();
    }
}
