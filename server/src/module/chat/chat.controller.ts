import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { GetUser } from 'src/components/decorators/get-user.decorator';
import { APP } from 'src/config/app.config';
import { IUser } from '../user/interfaces/user.interface';
import { ChatService } from './chat.service';
import { ChangeNameDto } from './dto/change-name.dto';
import { ChatDto } from './dto/chat.dto';
import { IAnswer } from './interfaces/answer.interface';
import { IChat } from './interfaces/chat.interface';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(AuthGuard(APP.JWT))
  async processMessage(@GetUser() user: IUser, @Body() chatDto: ChatDto): Promise<IAnswer> {
    return await this.chatService.processMessage(user, chatDto);
  }

  @Get()
  @UseGuards(AuthGuard(APP.JWT))
  async findAll(@GetUser() user: IUser): Promise<IChat[]> {
    return await this.chatService.findAllByUserId(user._id);
  }

  @Get('models')
  async findAllModels(): Promise<String[]> {
    return await this.chatService.findAllModels();
  }

  @Put('update')
  @UseGuards(AuthGuard(APP.JWT))
  async changeName(@Body() changeNameDto: ChangeNameDto): Promise<IChat> {
    return await this.chatService.updateByPayload(new Types.ObjectId(changeNameDto.chatId), {
      name: changeNameDto.name,
    });
  }

  @Delete('delete/:chatId')
  @UseGuards(AuthGuard(APP.JWT))
  async deleteChatt(@Param('chatId') chatId: string): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return await this.chatService.deleteById(new Types.ObjectId(chatId));
  }

  @Delete('delete-all')
  @UseGuards(AuthGuard(APP.JWT))
  async deleteAll(@GetUser() user: IUser): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return await this.chatService.deleteAllByUserId(user._id);
  }
}
