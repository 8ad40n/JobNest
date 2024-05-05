import { Expose } from "class-transformer";

export class profileDto {
    @Expose()
    id: number;

    
    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    subscriptionStatus: string;
}
