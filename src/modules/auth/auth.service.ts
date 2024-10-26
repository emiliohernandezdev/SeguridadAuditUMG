import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/request/create-user.request";
import { LoginRequestDto } from "./dto/request/login.request";
import * as bcrypt from 'bcrypt';
import { LoginResponse } from "./dto/response/login.response";
import { RegisterResponse } from "./dto/response/register.response";
import { RoleService } from "./role.service";
import { BaseResponse } from "src/tools/BaseResponse";
import { MailerService } from "@nestjs-modules/mailer";
import { ValidateTokenRequest } from "./dto/request/validate-token.request";
import { GetUserInfoResponse } from "./dto/response/get-user-info.response";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        private roleService: RoleService,
        private mailerService: MailerService) { }


    public async getUserInfo(userId: any){
        var response = new GetUserInfoResponse();

        try{
            const find = await this.userModel.findOne({ _id: userId.sub }).populate('role');
            if(!find){
                response.success = false;
                response.message = 'El usuario no existe';
                return response;
            }else{
                response.user = find;
                response.success = true;
                response.message = 'Informacion del usuario';
                return response;
            }
        }catch(err){
            response.success = false;
            response.message = 'Error al obtener la informacion del usuario';
            return response;
        }
    }

    public async registerUser(body: CreateUserDto) {
        var response = new RegisterResponse();

        try {
            const valid = await this.userModel.findOne({
                $or: [
                    { dpi: body.dpi },
                    { email: body.email.toLowerCase() }
                ]
            });

            if (valid) {
                response.success = false;
                response.message = 'Ya existe un usuario registrado con ese documento de identidad y/o email.';
                return response;
            } else {
                const creation = new this.userModel(body);
                creation.password = await bcrypt.hash(body.password, 10);
                creation.email = body.email.toLowerCase();
                creation.role = await this.roleService.getDefaultRole();
                await creation.save();
                response.user = creation;
                response.success = true;
                response.message = 'Usuario registrado';
                return response;
            }
        } catch (err) {
            response.success = false;
            response.message = 'Error al registrar el usuario';
            return response;
        }
    }

    public async doLogin(body: LoginRequestDto) {
        var response = new LoginResponse();

        const user = await this.userModel.findOne({ dpi: body.dpi }).populate('role');
        if (user) {
            var compare = await bcrypt.compare(body.password, user.password);
            if (compare) {
                const token = this.jwtService.sign({ sub: user._id, dpi: user.dpi });

                if (user.role.name == 'admin') {
                    response.success = true;
                    response.message = 'Login exitoso';
                    response.data = token;
                    response.role = user.role;
                    return response;
                } else {
                    try {
                        await this.mailerService.sendMail({
                            to: user.email.toLowerCase(),
                            subject: 'Tu Token de Acceso',
                            template: 'token', // nombre de la plantilla sin la extensión
                            context: {
                                token, // pasa el token a la plantilla
                            },
                        });
                        response.role = user.role;
                        response.success = true;
                        response.message = 'Token de acceso enviado al correo.';
                        return response;
                    } catch (err) {
                        console.log(err)
                        response.success = false;
                        response.message = 'Error al enviar el token de acceso';
                        return response;
                    }
                }

            } else {
                response.success = false;
                response.message = 'Credenciales incorrectas';
                return response;
            }
        } else {
            response.success = false;
            response.message = 'El usuario no existe';
            return response;
        }
    }

    public async validateToken(body: ValidateTokenRequest) {
        var response = new BaseResponse();
        try {
            this.jwtService.verify(body.token);
            response.success = true;
            response.message = 'Token valido';
            response.data = body.token;
            return response;
        } catch (err) {
            response.success = false;
            response.message = 'Token invalido';
            return response;
        }
    }

    public async getRole(request: any){
        var response = new BaseResponse();
        try{
            const find = await this.userModel.findOne({ _id: request.sub }).populate('role');
            if(!find){
                response.success = false;
                response.message = 'El usuario no existe';
                return response;
            }else{
                response.success = true;
                response.message = 'Informacion del usuario';
                response.data = find.role;
                return response;
            }
        }catch(err){
            response.success = false;
            response.message = 'Error al obtener la informacion del usuario';
            return response;
        }
    }

    public async getUsers() {
        var response = new BaseResponse();

        try {
            const find = await this.userModel.find();
            response.success = true;
            response.message = 'Listado de usuarios';
            response.data = find;
            return response;
        } catch (err) {
            response.success = false;
            response.message = 'Error al obtener el listado de usuarios';
            return response;
        }
    }
}