import { IsNotEmpty, IsString } from "class-validator";

export class ValidateTokenRequest{
    @IsString()
    @IsNotEmpty()
    token: string;
}