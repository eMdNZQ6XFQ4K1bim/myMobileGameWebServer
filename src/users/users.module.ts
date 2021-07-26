import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/entities/userInfo.entity';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserInfo]),
  ],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule {}
