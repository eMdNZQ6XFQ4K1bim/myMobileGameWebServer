import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserToken } from "./userToken.entity";

@Entity('userInfo', { schema: 'auth' })
export class UserInfo {
    @PrimaryGeneratedColumn({ type: 'int', name: 'userId' })
    userId: number;

    @Column('varchar', { unique: true, name: 'UId', nullable: false, length: 256 })
    uId: string;

    @Column('varchar', { name: 'nickName', nullable: false, length: 256 })
    nickName: string;

    @Column('varchar', { name: 'userType', nullable: false, length: 128 })
    userType: string;

    @Column('timestamp', { name: 'lastLogin' })
    lastLogin: Date;

    @OneToMany(
        () => UserToken,
        (userToken) => userToken.userInfo
    )
    userTokens: UserToken[];
}