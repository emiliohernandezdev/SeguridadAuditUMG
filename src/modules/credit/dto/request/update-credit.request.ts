import { IsNumber, IsString } from "class-validator";

export class UpdateCreditRequest{
    @IsString()
    id: string;
    
    @IsNumber()
    before: number;

    @IsNumber()
    after: number;
}