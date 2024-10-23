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

@Injectable()
export class CreditService {
    constructor(@InjectModel(Credit.name) private creditModel: Model<Credit>,
        @InjectModel(User.name) private userModel: Model<User>) { }

    public async addCreditAccount() {
        const find = await this.creditModel.findOne({
        });
    }

    public async getMyCredit(userId: string) {
        var response = new GetMyCreditResponse();
        try {
            const find = await this.creditModel.findOne({
                user: userId
            });

            if (!find) {
                response.credit = find.limit;
                response.remaining = find.available;
                response.success = true;
                response.message = "Crédito encontrado";
                return response;
            } else {
                response.message = "Crédito no encontrado";
                response.success = false;
                return response;
            }
        } catch (err) {
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
                return response;
            }
        } catch (err) {
            response.success = false;
            response.message = "Error al agregar la cuenta de crédito";
            return response;
        }
    }

    public async updateCredit(body: UpdateCreditRequest) {
        var response = new UpdateCreditResponse();
        try {
            const update = await this.creditModel.findByIdAndUpdate({
                _id: body.id
            },
                {
                    available: (body.before - body.after)
                }, { new: true });

            if (update) {
                response.success = true;
                response.message = "Crédito actualizado con éxito";
                response.credit = update;
                return response;
            } else {
                response.success = false;
                response.message = "El crédito no existe o no se pudo actualizar";
                return response;
            }
        } catch (err) {
            response.success = false;
            response.message = "Error al actualizar el crédito";
            return response;
        }
    }
}