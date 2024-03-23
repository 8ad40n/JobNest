import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Option } from "src/entities/option.entity";
import { Repository } from "typeorm";
import { createOptionDto } from "../dto/create-option.dto";
import { Question } from "src/entities/question.entity";

@Injectable()
export class OptionService
{
    constructor(@InjectRepository(Option)private optionRepository:Repository<Option>){}


    async createOption(option:createOptionDto, question:Question){
        const newOption=this.optionRepository.save({
            text:option.text,
            isCorrect:option.isCorrect
        })
    }

}