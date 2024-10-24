import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Role } from "./role.schema";
import { Model } from "mongoose";
import { GetRolesResponse } from "./dto/response/get-roles.response";
import { AddRoleRequest } from "./dto/request/add-role.request";
import { AddRoleResponse } from "./dto/response/add-role.response";


@Injectable()
export class RoleService {

    constructor(@InjectModel(Role.name) private roleModel: Model<Role>) { 
        this.defaultRole()
    }

    public async getRoles() {
        var response = new GetRolesResponse();
        try {
            const find = await this.roleModel.find();
            response.roles = find;
            response.success = true;
            response.message = "Roles encontrados";
            return response;
        } catch (err) {
            response.success = false;
            response.message = "Error al obtener los roles";
            return response;
        }
    }

    public async addRole(request: AddRoleRequest) {
        var response = new AddRoleResponse();
        try {
            const find = await this.roleModel.findOne({ name: request.name });
            if (find) {
                response.success = false;
                response.message = "El rol ya existe";
                return response;
            } else {
                const role = new this.roleModel(request);
                await role.save();
                response.role = role;
                response.success = true;
                response.message = "Rol creado";
                return response;
            }
        } catch (err) {
            response.success = false;
            response.message = "Error al crear el rol";
            return response;
        }
    }

    public async defaultRole(){
        var response = new AddRoleResponse();
        try {
            const find = await this.roleModel.findOne({ name: "user" });
            if (find) {
                response.success = true;
                response.message = "Rol por defecto si existe";
                return response;
            } else {
                const role = new this.roleModel({ name: "user", description: 'Rol por defecto' });
                await role.save();
                response.role = role;
                response.success = true;
                response.message = "Rol por defecto creado";
                return response;
            }
        } catch (err) {
            response.success = false;
            response.message = "Error al crear el rol por defecto";
            return response;
        }
    }

    public async getDefaultRole(){
        const find = await this.roleModel.findOne({ name: "user" });
        return find;
    }
}