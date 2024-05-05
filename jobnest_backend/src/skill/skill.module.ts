import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from 'src/entities/skills.entity';
import { User } from 'src/entities/user.entity';
import { UserSkill } from 'src/entities/userSkills.entity';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSkill]), TypeOrmModule.forFeature([Skill]), TypeOrmModule.forFeature([User])],
  providers: [SkillService],
  controllers: [SkillController]
})
export class SkillModule {}
