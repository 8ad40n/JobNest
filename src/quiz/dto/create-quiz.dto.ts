//import { isNotEmpty } from "class-validator"

import { IsNotEmpty, Length } from "class-validator"

export class createQuizDto
{
    @IsNotEmpty({message: 'The quiz should have a title'})
    @Length(3,100)

   
    title:string

    
   @IsNotEmpty()
   @Length(3)
    description:string

   
    
}   