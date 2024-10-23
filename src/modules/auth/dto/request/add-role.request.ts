import { IsNotEmpty, IsString } from "class-validator";

export class AddRoleRequest{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}