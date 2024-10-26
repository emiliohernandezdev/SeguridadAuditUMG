import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction{
    @Prop()
    uuid: string;

    @Prop()
    amount: string;

    @Prop()
    transactionDate: Date;

    @Prop()
    country: string;

    @Prop()
    currency: string;

    @Prop()
    source: string;

    @Prop()
    destination: string;

    @Prop()
    bic: string;

    @Prop()
    terminal: string;

    @Prop()
    type: string;

    @Prop()
    description: string;

    @Prop()
    terminalLocation: string;

    @Prop()
    customer: string;

    @Prop()
    reference: string;

    @Prop()
    token: string;

    @Prop()
    clientIp: string;

    @Prop()
    terminalCode: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);