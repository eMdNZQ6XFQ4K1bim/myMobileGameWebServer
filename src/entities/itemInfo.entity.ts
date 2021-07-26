import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserOwnItem } from "./userOwnItem.entity";

@Entity('itemInfo')
export class ItemInfo {
    @ApiProperty()
    @IsNumber()
    @PrimaryGeneratedColumn({ type: 'int', name: 'itemId' })
    itemId: number;

    @ApiProperty()
    @IsString()
    @Column('varchar', { name: 'itemName', nullable: false, length: 32 })
    itemName: string;

    @ApiProperty()
    @IsNumber()
    @Column('int', { name: 'itemType', nullable: false })
    itemType: number;
    
    @ApiProperty()
    @IsNumber()
    @Column('int', { name: 'maxQNTY', nullable: false, comment: "최대 보유 갯수" })
    maxQNTY: number;

    @OneToMany(
        () => UserOwnItem,
        (userOwnItem) => userOwnItem.itemInfo,
    )
    userOwnItems: UserOwnItem[];
}