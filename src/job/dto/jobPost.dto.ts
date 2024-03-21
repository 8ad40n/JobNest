import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JobPostDto {

  @IsString({ message: 'valid name is required' })
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsOptional() // Make postedBy optional
  @IsString()
  postedBy?: string;

  @IsNotEmpty()
  budget: number;

  @IsNotEmpty()
  @IsString()
  duration: string;
}
