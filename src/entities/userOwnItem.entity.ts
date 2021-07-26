import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemInfo } from "./itemInfo.entity";
import { UserInfo } from "./userInfo.entity";

@Entity('userOwnItem')
export class UserOwnItem {
    @ApiProperty()
    @IsNumber()
    @PrimaryGeneratedColumn({ type: 'int' })
    userOwnItemId: number;
    
    @ApiProperty()
    @IsNumber()
    @Column({ type: 'int'})
    userId: number;

    @ApiProperty()
    @IsNumber()
    @Column({ type: 'int'})
    itemId: number;

    @ApiProperty()
    @IsNumber()
    @Column({ type: 'int' })
    currentQNTY: number;

    @ManyToOne(
        () => UserInfo,
        (userInfo) => userInfo.userOwnItems,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    )
    @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
    userInfo: UserInfo;

    @ManyToOne(
        () => ItemInfo,
        (itemInfo) => itemInfo.userOwnItems,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    )
    @JoinColumn([{ name: 'itemId', referencedColumnName: 'itemId' }])
    itemInfo: ItemInfo;
}