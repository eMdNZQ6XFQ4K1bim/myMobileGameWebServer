import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthType } from 'src/auth/types/auth.type';
import { AuthTypes } from 'src/common/decorators/authTypes.decorator';
import { AuthTypeGuard } from 'src/common/guards/auth-type.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { NewItemDto } from './dto/new-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';

@ApiTags('items')
@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @ApiBearerAuth()
    @ApiOperation({
        description: "[Admin] 새로운 아이템 생성 함수"
    })
    @AuthTypes(AuthType.ADMIN)
    @UseGuards(JwtAuthGuard, AuthTypeGuard)
    @Post('/')
    async CreateNewItem(@Body() newItemDto: NewItemDto) {
        return this.itemsService.CreateNweItem(newItemDto);
    }

    @ApiBearerAuth()
    @ApiOperation({
        description: "[Admin] 아이템 정보 수정 함수"
    })
    @AuthTypes(AuthType.ADMIN)
    @UseGuards(JwtAuthGuard, AuthTypeGuard)
    @Put('/:itemId')
    async UpdateItem(@Param('itemId') itemId: number, @Body() updateItemDto: UpdateItemDto) {
        return this.itemsService.UpdateItem(itemId, updateItemDto);
    }

    @ApiBearerAuth()
    @ApiOperation({
        description: "아이템 정보 요청"
    })
    @UseGuards(JwtAuthGuard)
    @Get('/:itemId')
    async GetItem(@Param('itemId') itemId: number) {
        return this.itemsService.GetItem(itemId);
    }

    @ApiBearerAuth()
    @ApiOperation({
        description: "[Admin] 아이템 정보 요청"
    })
    @AuthTypes(AuthType.ADMIN)
    @UseGuards(JwtAuthGuard, AuthTypeGuard)
    @Get('/')
    async GetItems(@Query('page') page: number) {
        return this.itemsService.GetItemsAll(page, 10);
    }
}
