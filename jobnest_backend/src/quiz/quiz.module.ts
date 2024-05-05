
import { Module } from '@nestjs/common';
import { QuizController } from './controllers/quiz.controller';
import { QuizService } from './services/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizReository } from './quiz.repository';
import { QuestionController } from './controllers/question.controller';
import { QuestionService } from './services/question.service';
import { Question } from 'src/entities/question.entity';
import { OptionController } from './controllers/option.controller';
import { OptionService } from './services/option.service';
import { Option } from 'src/entities/option.entity';

@Module({
    controllers:[QuizController, QuestionController, OptionController],
    imports:[TypeOrmModule.forFeature([Quiz]),TypeOrmModule.forFeature([Question,Option])],
    providers:[QuizService, QuestionService, OptionService],
})
export class QuizModule {

}
