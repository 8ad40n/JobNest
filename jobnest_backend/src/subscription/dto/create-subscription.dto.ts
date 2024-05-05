import { IsNotEmpty } from "class-validator";

export class CreateSubscriptionDto {
    @IsNotEmpty()
    package_id: number;
}
