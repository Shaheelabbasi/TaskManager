import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.entity';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
imports:[TypeOrmModule.forFeature([User]),
     JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }
      })
    })
    ]
 ,
 controllers: [AuthController],
 providers:[AuthService],
 exports:[JwtModule]
}
)

export class AuthModule {}
