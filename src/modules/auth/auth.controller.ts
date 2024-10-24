import { Body, Controller, Get, Post } from "@nestjs/common";
import { Roles } from "./role.decorator";
import { Role } from "./role.enum";
import { CreateUserDto } from "./dto/request/create-user.request";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./dto/request/login.request";
import { ValidateTokenRequest } from "./dto/request/validate-token.request";

@Controller('auth')
export class AuthController{

    constructor(private readonly authService: AuthService){}

    @Post('register')
    // @Roles(Role.Admin)
    public async createUser(@Body() body: CreateUserDto){
        return this.authService.registerUser(body);
    }

    @Post('login')
    public async loginUser(@Body() body: LoginRequestDto){
        return this.authService.doLogin(body);
    }

    @Post('validate')
    public async validateToken(@Body() body: ValidateTokenRequest){
        return await this.authService.validateToken(body);
    }
}