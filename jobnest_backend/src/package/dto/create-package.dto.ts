import { IsNotEmpty, IsNumberString, isNotEmpty } from "class-validator";

export class CreatePackageDto {

    @IsNotEmpty()
    @IsNumberString()
    price: number;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    @IsNumberString()
    validity_time: number;
}
