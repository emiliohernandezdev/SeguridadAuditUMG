import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Roles } from "./role.decorator";
import { Role } from "./role.enum";
import { CreateUserDto } from "./dto/request/create-user.request";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./dto/request/login.request";
import { ValidateTokenRequest } from "./dto/request/validate-token.request";
import { AuthGuard } from "./auth.guard";

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

    @UseGuards(AuthGuard)
    @Get('userInfo')
    public async getUserInfo(@Req() req: Request){
        return await this.authService.getUserInfo(req['user']);
    }

    @UseGuards(AuthGuard)
    @Get('role')
    public async getRole(@Req() req: Request){
        return await this.authService.getRole(req['user']);
    }

    @UseGuards(AuthGuard)
    @Get('users')
    public async getUser(){
        return await this.authService.getUsers();
    }
}