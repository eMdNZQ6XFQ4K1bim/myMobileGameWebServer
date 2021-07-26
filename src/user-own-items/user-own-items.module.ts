import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { UserOwnItem } from 'src/entities/userOwnItem.entity';
import { UserOwnItemsController } from './user-own-items.controller';
import { UserOwnItemsService } from './user-own-items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOwnItem]),
  ],
  controllers: [UserOwnItemsController],
  providers: [UserOwnItemsService, JwtStrategy],
  exports: [UserOwnItemsService]
})
export class UserOwnItemsModule {}
