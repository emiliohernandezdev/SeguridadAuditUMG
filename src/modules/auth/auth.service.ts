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

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService) {}


    public async registerUser(body: CreateUserDto) {
        var response = new RegisterResponse();

        try {
            const valid = await this.userModel.findOne({ dpi: body.dpi });

            if (valid) {
                response.success = false;
                response.message = 'El usuario ya existe';
                return response;
            } else {
                const creation = new this.userModel(body);
                creation.password = await bcrypt.hash(body.password, 10);
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
                const token = this.jwtService.sign({ dpi: user.dpi });
                response.token = token;
                response.success = true;
                response.message = 'Sesión iniciada con éxito';
                return response;
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
}