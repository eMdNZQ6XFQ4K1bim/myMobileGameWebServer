import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "./userInfo.entity";

/*
 * User Refresh Token 관리 
 */
@Entity('userToken', { schema: 'auth' })
export class UserToken {
    @PrimaryGeneratedColumn({ type: 'int', name: 'userTokenId' })
    userTokenId: number;

    @Column('int', { name: 'userId' })
    userId: number;

    @Column('varchar', { name: 'refreshToken', nullable: false, length: 256 })
    refreshToken: string;

    @Column('timestamp', { name: 'lastUsed' })
    lastUsed: Date;

    @Column('tinyint', { name: 'isDestroyed', width: 1 })
    isDestroyed: boolean;

    @ManyToOne(() => UserInfo, (userInfo) => userInfo.userTokens, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
    userInfo: UserInfo;
}