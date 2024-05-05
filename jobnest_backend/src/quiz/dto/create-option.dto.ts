//import { isNotEmpty } from "class-validator"

import { IsNotEmpty, Length } from "class-validator"

export class createOptionDto
{
    @IsNotEmpty()
    @Length(3,100)
    text:string;

    @IsNotEmpty()
    questionId:number;

    @IsNotEmpty()
    isCorrect:boolean;




  

   
    
}   