import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CreditModule } from './modules/credit/credit.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: '.prod.env'
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    AuthModule,
    CreditModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule { }
