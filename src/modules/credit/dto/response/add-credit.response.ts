import { BaseResponse } from "src/tools/BaseResponse";
import { Credit } from "../../credit.schema";
import { User } from "src/modules/auth/user.schema";

export class AddCreditResponse extends BaseResponse{
    public credit: Credit = null;
    public user: User = null;
}