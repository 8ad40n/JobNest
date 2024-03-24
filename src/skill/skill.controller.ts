import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AddUserSkillDto } from './dto/addUserSkill.dto';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
    constructor(private readonly skillService: SkillService){}
    

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt')
    @Post("add")
    async addUserSkill(@Body() addUserSkillDto: AddUserSkillDto, @Req() req): Promise<any> {
        const userID = req.user.id;
        const { skillName } = addUserSkillDto;
        
        try {
            const userSkill = await this.skillService.addUserSkill(userID, skillName);
            return { message: 'Skill added successfully', userSkill };
        } catch (error) {
            return { message: error.message };
        }
    }


    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt')
    @Get("show")
    async getUserSkillNames(@Req() req): Promise<any> {
        const userID = req.user.id;
        const userSkillNames = await this.skillService.getUserSkillNames(userID);
        return { skills: userSkillNames };
    }
}
