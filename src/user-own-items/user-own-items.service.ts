import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOwnItem } from 'src/entities/userOwnItem.entity';
import { Repository } from 'typeorm';
import { AddUserOwnItemDto } from './dto/add-user-own-item.dto';

@Injectable()
export class UserOwnItemsService {
  constructor(
    @InjectRepository(UserOwnItem)
    private readonly userOwnItemRepository: Repository<UserOwnItem>,
  ) {}

  async AddUserOwnItem(addUserOwnItem: AddUserOwnItemDto) {
    const userOwnItem = await this.userOwnItemRepository.findOne({
      where: {
        itemId: addUserOwnItem.itemId,
        userId: addUserOwnItem.userId,
      },
      relations: ['itemInfo'],
    });

    if (userOwnItem === undefined) {
      return await this.userOwnItemRepository.insert({
        ...addUserOwnItem,
        currentQNTY: 1,
      });
    }

    userOwnItem.currentQNTY += addUserOwnItem.addCount;
    if (userOwnItem.itemInfo.maxQNTY < userOwnItem.currentQNTY) {
      userOwnItem.currentQNTY = userOwnItem.itemInfo.maxQNTY;
    }

    return await this.userOwnItemRepository.save(userOwnItem);
  }

  async GetUserOwnItems(userId: number) {
    return await this.userOwnItemRepository.find({
      userId,
    });
  }
}
