import { IsNumber, IsNumberString, IsString } from "class-validator";

export class UpdateCreditRequest{
    @IsString()
    id: string;
    
    @IsNumber()
    limit: number;

    @IsNumber()
    available: number;
}