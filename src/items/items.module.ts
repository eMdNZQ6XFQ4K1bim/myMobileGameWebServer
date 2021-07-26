import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { ItemInfo } from 'src/entities/itemInfo.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemInfo]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, JwtStrategy],
  exports: [ItemsService]
})
export class ItemsModule {}
