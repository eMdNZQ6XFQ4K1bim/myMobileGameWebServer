import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemInfo } from 'src/entities/itemInfo.entity';
import { Repository } from 'typeorm/repository/Repository';
import { NewItemDto } from './dto/new-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ItemInfo)
        private readonly itemInfoRepository: Repository<ItemInfo>
    ) { }

    async CreateNweItem(newItemDto: NewItemDto) {
        return await this.itemInfoRepository.insert(newItemDto);
    }

    async UpdateItem(itemId: number, updateItemDto: UpdateItemDto) {
        return await this.itemInfoRepository.update(
            itemId,
            updateItemDto
        )
    }

    async GetItem(itemId: number) {
        return await this.itemInfoRepository.findOne({
            itemId
        })
    }

    async GetItemsAll(page: number, pageSize: number = 10) {
        const [result, total] = await this.itemInfoRepository.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { result, count: total }
    }
}
