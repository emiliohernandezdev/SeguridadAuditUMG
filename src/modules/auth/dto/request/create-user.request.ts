import { IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto{

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1
    })
    password: string;

    @IsString()
    dpi: string;

    @IsString()
    role: string;
}