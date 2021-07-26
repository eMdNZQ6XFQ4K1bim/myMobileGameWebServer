import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthType } from 'src/auth/types/auth.type';
import { AuthTypes } from 'src/common/decorators/authTypes.decorator';
import { AuthTypeGuard } from 'src/common/guards/auth-type.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }


    @ApiBearerAuth()
    @ApiOperation({
        description: "[Admin] 유저 정보를 모두 반환하는 함수"
    })
    @AuthTypes(AuthType.ADMIN)
    @UseGuards(JwtAuthGuard, AuthTypeGuard)
    @Get('/')
    async GetUserInfos() {
        return this.usersService.GetUserInfos();
    }
}
