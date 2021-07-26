import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthType } from 'src/auth/types/auth.type';
import { AuthTypes } from 'src/common/decorators/authTypes.decorator';
import { AuthTypeGuard } from 'src/common/guards/auth-type.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AddUserOwnItemDto } from './dto/add-user-own-item.dto';
import { UserOwnItemsService } from './user-own-items.service';

@Controller('user-own-items')
export class UserOwnItemsController {
  constructor(private readonly userOwnItemsService: UserOwnItemsService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: '[Admin] 유저 아이템 추가 함수',
  })
  @AuthTypes(AuthType.ADMIN)
  @UseGuards(JwtAuthGuard, AuthTypeGuard)
  @Post('/')
  async AddUserOwnItem(@Body() addUserOwnItemDto: AddUserOwnItemDto) {
    return this.userOwnItemsService.AddUserOwnItem(addUserOwnItemDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: '내 아이템 반환',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async GetUserOwnItem(@Request() req) {
    return this.userOwnItemsService.GetUserOwnItems(req.user.userId);
  }
}
