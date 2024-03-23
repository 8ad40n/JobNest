import { IsEmail, IsNotEmpty } from "class-validator";

export class editProfileDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

}
