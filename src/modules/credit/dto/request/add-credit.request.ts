import { IsNumber, IsString } from "class-validator";

export class AddCreditRequest{
    @IsNumber()
    limit: number;

    available: number;

    @IsString()
    user: string;
}