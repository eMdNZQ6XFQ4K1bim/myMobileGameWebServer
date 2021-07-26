import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { FirebaseAuthDTO } from './dto/firebase-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/access-token/firebase')
    async LoginWithFirebaseToken(@Body() firebaseAuthDTO: FirebaseAuthDTO  ) {
        return this.authService.LoginWithFirebaseToken(firebaseAuthDTO.accessToken)
    }
}
