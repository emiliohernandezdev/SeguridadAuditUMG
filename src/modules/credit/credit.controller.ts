import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CreditService } from "./credit.service";
import { AuthGuard } from "../auth/auth.guard";
import { AddCreditRequest } from "./dto/request/add-credit.request";
import { UpdateCreditRequest } from "./dto/request/update-credit.request";
import { DeleteCreditRequest } from "./dto/request/delete-credit.request";

@Controller('credit')
export class CreditController{
    constructor(private creditService: CreditService){}

    @UseGuards(AuthGuard)
    @Get('my')
    public async getMyCredit(@Req() req: Request){
        return await this.creditService.getMyCredit(req['user']);
    }

    @UseGuards(AuthGuard)
    @Get('users')
    public async getCreditUsers(){
        return await this.creditService.getCreditWithUsers()
    }

    @Post('add')
    public async addCredit(@Body() body: AddCreditRequest){
        return await this.creditService.addCredit(body);
    }

    @Patch('update')
    public async updateCredit(@Body() body: UpdateCreditRequest){
        return await this.creditService.updateCredit(body);
    }

    @Delete('delete/:id')
    public async deleteCredit(@Param("id") id: string){
        return await this.creditService.deleteCredit(id);
    }

    @UseGuards(AuthGuard)
    @Post('generateTrx')
    public async generateTrx(@Req() req: Request){
        return await this.creditService.generateTrx(req);
    }

}