import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../auth/user.schema";

export type CreditDocument = Credit & Document;

@Schema()
export class Credit {

    @Prop()
    limit: number;

    @Prop()
    available: number;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const CreditSchema = SchemaFactory.createForClass(Credit);