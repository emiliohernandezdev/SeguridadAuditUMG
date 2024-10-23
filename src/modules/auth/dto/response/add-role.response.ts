import { BaseResponse } from "src/tools/BaseResponse";
import { Role } from "../../role.schema";

export class AddRoleResponse extends BaseResponse{
    public role: Role = null;
}