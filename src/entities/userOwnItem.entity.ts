import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "./userInfo.entity";

@Entity('userOwnItem')
export class UserOwnItem {
    @PrimaryGeneratedColumn({ type: 'int' })
    userOwnItem: number;
    
    @Column({ type: 'int'})
    userId: number;

    @Column({ type: 'int'})
    itemId: number;

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
}