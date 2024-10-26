import { IsNumber, IsNumberString, IsString } from "class-validator";

export class UpdateCreditRequest{
    @IsString()
    id: string;
    
    @IsNumberString()
    limit: number;

    @IsNumberString()
    available: number;
}