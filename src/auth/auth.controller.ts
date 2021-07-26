import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { FirebaseAuthDTO } from './dto/firebase-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({
        description: "테스트시 사용되는 어드민 토큰 반환 함수, 서버에서 해당 기능을 끌 수 있음."
    })
    @Get('/access-token/test-admin')
    async GetTestAccessToken() {
        return this.authService.GetTestAccessToken();
    }
    
    @ApiOperation({
        description: "firebase token을 이용해서 AccessToken 요청"
    })
    @Post('/access-token/firebase')
    async LoginWithFirebaseToken(@Body() firebaseAuthDTO: FirebaseAuthDTO  ) {
        return this.authService.LoginWithFirebaseToken(firebaseAuthDTO.accessToken)
    }
}
