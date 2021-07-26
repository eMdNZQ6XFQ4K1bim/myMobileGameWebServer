import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/entities/userInfo.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigService,
    TypeOrmModule.forFeature([UserInfo]),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) =>
        await {
          secret: config.get<string>('JWT_SECRET_TOKEN'),
        },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
