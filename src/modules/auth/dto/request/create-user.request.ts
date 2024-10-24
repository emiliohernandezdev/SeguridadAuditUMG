import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto{

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1
    }, { message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.' })
    password: string;

    @IsString()
    email: string;

    @IsString({
        message: 'El DPI no es valido.'
    })
    @IsNotEmpty({
        message: 'El DPI no puede estar vacío.'
    })
    dpi: string;
}