import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from 'mongoose';
import { Role } from "./role.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{

    @Prop()
    dpi: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({
        default: true
    })
    active: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);