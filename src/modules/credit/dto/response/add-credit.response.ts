import { BaseResponse } from "src/tools/BaseResponse";
import { Credit } from "../../credit.schema";

export class AddCreditResponse extends BaseResponse{
    public credit: Credit = null;
}