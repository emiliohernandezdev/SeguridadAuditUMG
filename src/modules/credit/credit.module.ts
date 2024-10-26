import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Credit, CreditSchema } from './credit.schema';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from '../auth/user.schema';
import { Transaction, TransactionSchema } from './transaction.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Credit.name,
                schema: CreditSchema
            },
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: Transaction.name,
                schema: TransactionSchema
            }
        ]),
        JwtModule
    ],
    providers: [CreditService],
    controllers: [CreditController]
})
export class CreditModule {}
