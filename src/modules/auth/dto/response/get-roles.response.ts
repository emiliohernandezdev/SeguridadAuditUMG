import { BaseResponse } from "src/tools/BaseResponse";
import { Role } from "../../role.schema";

export class GetRolesResponse extends BaseResponse{
    public roles: Role[] = [];
}