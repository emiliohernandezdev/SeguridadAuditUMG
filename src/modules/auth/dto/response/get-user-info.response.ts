import { BaseResponse } from "src/tools/BaseResponse";
import { User } from "../../user.schema";

export class GetUserInfoResponse extends BaseResponse{
    public user: User = null;
}