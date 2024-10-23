import { IsString, IsStrongPassword } from "class-validator";

export class LoginRequestDto{
    @IsString()
    dpi: string;

    @IsString()
    password: string;
}