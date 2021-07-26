import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as firebaseAdmin from 'firebase-admin';
import { ErrorMsg } from 'src/common/erros.type';
import { UserInfo } from 'src/entities/userInfo.entity';
import { Repository } from 'typeorm';
import { AuthType } from './types/auth.type';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserInfo)
        private readonly userInfoRepository: Repository<UserInfo>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async LoginWithFirebaseToken(firebaseToken: string) {
        const firebaseUserInfo = await firebaseAdmin
            .auth()
            .verifyIdToken(firebaseToken);

        const userInfo = await this.GetUserInfo(firebaseUserInfo.uid);
        if (userInfo === undefined) {
            throw new HttpException(ErrorMsg.CAN_NOT_FOUND_USER_CREATE_USER, HttpStatus.UNAUTHORIZED)
        }

        return { accessToken: this.GenerateAccessToken(userInfo)};
    }

    async GetUserInfo(uId: string, updateLastLogin: boolean = false): Promise<UserInfo> {
        const userInfo = await this.userInfoRepository.findOne({
            uId,
        })

        if (updateLastLogin === true) {
            userInfo.lastLogin = new Date();
            this.userInfoRepository.save(userInfo);
        }

        return userInfo;
    }

    private GenerateAccessToken(userInfo: UserInfo): string {
        return this.jwtService.sign({
            userId: userInfo.userId,
            userType: userInfo.userType
        }, {
            expiresIn: this.configService.get('JWT_TIME')
        })
    }

    async GetTestAccessToken() {
        if( this.configService.get('TEST_ADMIN_ENABLE') !== 'true') {
            throw new HttpException(ErrorMsg.NOT_ENABLE_TEST_ADMIN , HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const testAdminUser = new UserInfo();
        testAdminUser.userId = 1;
        testAdminUser.userType = AuthType.ADMIN;

        return { accessToken: this.GenerateAccessToken(testAdminUser)};
    }
}
