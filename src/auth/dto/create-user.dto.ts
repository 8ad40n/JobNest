import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsString({ message: 'valid name is required' })
  @IsNotEmpty()
  name: string;


  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}