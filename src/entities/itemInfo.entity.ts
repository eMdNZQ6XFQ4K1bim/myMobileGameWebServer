import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('itemInfo')
export class ItemInfo {
    @PrimaryGeneratedColumn({ type: 'int', name: 'itemId' })
    itemId: number;

    @Column('varchar', { name: 'itemName', nullable: false, length: 32 })
    itemName: string;

    @Column('int', { name: 'itemType', nullable: false })
    itemType: number;
    
    @Column('int', { name: 'maxQNTY', nullable: false, comment: "최대 보유 갯수" })
    maxQNTY: number;
}