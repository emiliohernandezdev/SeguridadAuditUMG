import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Credit } from "./credit.schema";
import { Model } from "mongoose";
import { GetMyCreditResponse } from "./dto/response/get-my-credit.response";
import { AddCreditRequest } from "./dto/request/add-credit.request";
import { AddCreditResponse } from "./dto/response/add-credit.response";
import { User } from "../auth/user.schema";
import { UpdateCreditRequest } from "./dto/request/update-credit.request";
import { UpdateCreditResponse } from "./dto/response/update-credit.response";
import { GetCreditWithUsersResponse } from "./dto/response/get-with-users.response";
import { BaseResponse } from "src/tools/BaseResponse";
import { Transaction } from "./transaction.schema";
import { fa, faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreditService {
    constructor(@InjectModel(Credit.name) private creditModel: Model<Credit>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Transaction.name) private transactionModel:Model<Transaction>) { }

    public async addCreditAccount() {
        const find = await this.creditModel.findOne({
        });
    }

    public async getCreditWithUsers(){
        var response = new GetCreditWithUsersResponse();

        try {
            const find = await this.creditModel.find({}).populate('user');
            response.users = find;
            response.success = true;
            response.message = "Cuentas de credito encontradas";
            return response;
        } catch (err) {
            response.success = false;
            response.message = "Error al obtener las cuentas de credito";
            return response;
        }
    }

    public async getMyCredit(userId: any) {
        var response = new GetMyCreditResponse();
        try {
            const find = await this.creditModel.findOne({
                user: userId.sub
            });

            if (!find) {
                response.credit = 0.00;
                response.remaining = 0.00;
                response.success = false;
                response.message = "Crédito no encontrado, administracion le debera crear uno";
                return response;
            } else {
                response.credit = find.limit;
                response.remaining = find.available;
                response.message = "Crédito encontrado";
                response.success = true;
                return response;
            }
        } catch (err) {
            console.log(err)
            response.message = "Error al obtener el crédito";
            response.success = false;
            return response;
        }
    }

    public async addCredit(body: AddCreditRequest) {
        var response = new AddCreditResponse();
        try {
            const find = await this.creditModel.findOne({
                user: body.user
            });

            if (find) {
                response.success = false;
                response.message = "El usuario ya tiene una cuenta";
                return response;
            } else {
                const credit = new this.creditModel(body);
                credit.limit = body.limit;
                credit.available = body.available ?? body.limit;
                credit.user = await this.userModel.findOne({ _id: body.user });

                await credit.save();

                response.success = true;
                response.message = "Cuenta de crédito agregado";
                response.credit = credit;
                response.user = credit.user;
                return response;
            }
        } catch (err) {
            response.success = false;
            response.message = "Error al agregar la cuenta de crédito";
            return response;
        }
    }

    public async updateCredit(body: UpdateCreditRequest) {
        console.log(body)
        var response = new UpdateCreditResponse();
        try {
            const find = await this.creditModel.findById(body.id);
            if(find){
                const update = await this.creditModel.findByIdAndUpdate(find.id, {
                    available: body.available,
                    limit: body.limit
                }, { new: true });

                if (update) {
                    response.success = true;
                    response.message = "Crédito actualizado con éxito";
                    response.credit = update;
                    return response;
                } else {
                    response.success = false;
                    response.message = "El crédito no se pudo actualizar";
                    return response;
                }
            }else{
                response.success = false;
                response.message = "El crédito no existe";
                return response;
            }
        } catch (err) {
            response.success = false;
            response.message = "Error al actualizar el crédito";
            return response;
        }
    }

    public async generateTrx(req: any){
        var response = new BaseResponse();
        try{
            const find = await this.creditModel.findOne({
                user: req.user.sub
            });
            if(find){
                var ammount = faker.finance.amount({
                    min: 1,
                    max: find.available,
                    dec: 2
                });
                const creation = new this.transactionModel();
                creation.uuid = uuidv4();
                creation.amount = ammount;
                creation.transactionDate = faker.date.recent();
                creation.country = faker.address.countryCode();
                creation.currency = faker.finance.currencyCode();
                creation.source = faker.finance.iban();
                creation.destination = faker.finance.iban();
                creation.bic = faker.finance.bic();
                creation.terminal = faker.finance.routingNumber();
                creation.type = faker.finance.transactionType();
                creation.description = faker.finance.transactionDescription();
                creation.description = faker.finance.transactionDescription();
                creation.terminalLocation = faker.address.countryCode();
                creation.customer = uuidv4();
                creation.reference = faker.finance.ethereumAddress();
                creation.token = faker.finance.ethereumAddress();
                creation.clientIp = faker.internet.ip();
                creation.terminalCode = faker.finance.pin()

                await creation.save();

                const newAvailable = Number(find.available) - Number(ammount);
                const update = await this.creditModel.findByIdAndUpdate(find.id, {
                    available: newAvailable.toFixed(2)
                }, { new: true });

                if(update){
                    console.log('se actualizo')
                }else{
                    console.log('no se actualizo')
                }

                response.success = true;
                response.message = "Transacción generada con exito";
                response.data = creation;
                return response;
            }else{
                response.success = false;
                response.message = "Credito no encontrado";
                return response;
            }
            
        }catch(err){
            response.success = false;
            response.message = "Error al generar la transaccion";
            return response;
        }
    }

    public async deleteCredit(id: string){
        var response = new BaseResponse();
        try{
            const find = await this.creditModel.findById(id);
            if(find){
                const deleteCredit = await this.creditModel.findByIdAndDelete(find.id);
                if(deleteCredit){
                    response.success = true;
                    response.message = "Credito eliminado con exito";
                    return response;
                }else{
                    response.success = false;
                    response.message = "Error al eliminar el credito";
                    return response;
                }
            }else{
                response.success = false;
                response.message = "Credito no encontrado";
                return response;
            }
        }catch(err){
            response.success = false;
            response.message = "Error al eliminar el credito";
            return response;
        }
    }
}