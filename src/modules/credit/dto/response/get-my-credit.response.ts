import { BaseResponse } from "src/tools/BaseResponse";

export class GetMyCreditResponse extends BaseResponse{
    public credit: number = 0.00;
    public remaining: number = 0.00;
}