import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JobPostDto {

  @IsString({ message: 'valid name is required' })
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsOptional() 
  @IsString()
  postedBy?: string;

  @IsNotEmpty()
  budget: number;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  skills: string[];
}
