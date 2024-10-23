import { Body, Controller, Get, Post } from "@nestjs/common";
import { RoleService } from "./role.service";
import { AddRoleRequest } from "./dto/request/add-role.request";
import { AddRoleResponse } from "./dto/response/add-role.response";

@Controller('role')
export class RoleController{
    constructor(private roleService: RoleService){}

    /**
     * Get all roles from database
     * @returns {GetRolesResponse} A promise that resolves to a GetRolesResponse object
     */
    @Get('all')
    public async getRoles(){
        return await this.roleService.getRoles();
    }

    /**
     * Add role to database
     * @returns {AddRoleResponse} A object that resolves to a AddRoleResponse object
     */
    @Post('add')
    public async addRole(@Body() body: AddRoleRequest){
        return await this.roleService.addRole(body);
    }
}