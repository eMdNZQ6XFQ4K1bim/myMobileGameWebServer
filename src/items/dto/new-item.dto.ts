import { OmitType } from "@nestjs/swagger";
import { ItemInfo } from "src/entities/itemInfo.entity";

export class NewItemDto extends OmitType(ItemInfo, [
    'itemId'
]) {
}