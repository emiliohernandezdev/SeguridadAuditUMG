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
    ],
    controllers: [AuthController, RoleController],
    providers: [AuthService, RoleService],
})
export class AuthModule { }
