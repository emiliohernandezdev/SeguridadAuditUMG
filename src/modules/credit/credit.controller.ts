import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CreditService } from "./credit.service";
import { AuthGuard } from "../auth/auth.guard";
import { AddCreditRequest } from "./dto/request/add-credit.request";
import { UpdateCreditRequest } from "./dto/request/update-credit.request";
import { RolesGuard } from "../auth/roles.guard";

@Controller('credit')
export class CreditController{
    constructor(private creditService: CreditService){}

    @UseGuards(AuthGuard)
    @Get('my')
    public async getMyCredit(@Req() req: Request){
        return await this.creditService.getMyCredit(req['user'].toString());
    }

    @Post('add')
    public async addCredit(@Body() body: AddCreditRequest){
        return await this.creditService.addCredit(body);
    }

    @Patch('update')
    public async updateCredit(@Body() body: UpdateCreditRequest){
        return await this.creditService.updateCredit(body);
    }
}