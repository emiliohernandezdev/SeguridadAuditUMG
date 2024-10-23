export class BaseResponse{
    public success: boolean = false;
    public message: string = null;
    public data: any = null;

    constructor(private _success?: boolean, private _message?: string, private _data?: any){
        this.success = _success;
        this.message = _message;
        this.data = _data;
    }
}