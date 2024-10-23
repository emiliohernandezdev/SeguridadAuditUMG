import { BaseResponse } from "src/tools/BaseResponse";
import { Credit } from "../../credit.schema";

export class UpdateCreditResponse extends BaseResponse{
    public credit: Credit = null;
}