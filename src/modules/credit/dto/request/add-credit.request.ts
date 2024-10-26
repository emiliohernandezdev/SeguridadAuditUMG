import { IsNumber, IsNumberString, IsString } from "class-validator";

export class AddCreditRequest{
    @IsNumberString()
    limit: number;
    
    @IsNumberString()
    available: number;

    @IsString()
    user: string;
}