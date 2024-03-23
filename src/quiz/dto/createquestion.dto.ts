//import { isNotEmpty } from "class-validator"

import { IsNotEmpty, Length } from "class-validator"

export class createQuestionDto
{
    @IsNotEmpty()
    @Length(3,100)
    question:string;

    @IsNotEmpty()
    quizId:number;


  

   
    
}   