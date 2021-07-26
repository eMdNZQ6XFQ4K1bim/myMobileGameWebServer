import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { UserOwnItem } from "src/entities/userOwnItem.entity";

export class AddUserOwnItemDto extends OmitType(UserOwnItem,[
    'userOwnItemId',
    'currentQNTY'
]) {

    @ApiProperty({
        default: 1
    })
    @IsNumber()
    addCount: number;
}