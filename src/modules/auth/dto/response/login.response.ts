import { BaseResponse } from "src/tools/BaseResponse";

export class LoginResponse extends BaseResponse{
    public token: string = null;
}