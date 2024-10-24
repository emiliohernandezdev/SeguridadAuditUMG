import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Role, RoleSchema } from './role.schema';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Role.name, schema: RoleSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.getOrThrow<string>('JWT_SECRET', 'admin123@'),
              signOptions: {
                expiresIn: configService.getOrThrow<string>('JWT_EXP', '2h'),
              }
            }),
            inject: [ConfigService]
          }),
          MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com',
              port: 587,
              secure: false,
              auth: {
                user: 'emiliohernandezgt@gmail.com', // tu correo de Gmail
                pass: 'xvru flmb hjon mbds', // tu contraseña o contraseña de aplicación
              }
            },
            defaults: {
              from: '"Tokens Farmacia" <emiliohernandezgt@gmail.com>',
            },
            template: {
              dir: __dirname + '/templates',
              adapter: new PugAdapter(),
              options: {
                strict: true,
              },
            },
          })
    ],
    controllers: [AuthController, RoleController],
    providers: [AuthService, RoleService],
})
export class AuthModule { }
