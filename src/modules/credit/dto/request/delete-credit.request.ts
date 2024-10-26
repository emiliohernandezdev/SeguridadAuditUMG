import { IsString } from "class-validator";

export class DeleteCreditRequest{
    @IsString()
    id: string;
}