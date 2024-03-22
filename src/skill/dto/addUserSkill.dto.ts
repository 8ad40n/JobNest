import { IsNotEmpty, IsString } from 'class-validator';

export class AddUserSkillDto {
  @IsNotEmpty()
  @IsString()
  skillName: string;
}