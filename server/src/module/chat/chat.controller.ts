import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/components/decorators/get-user.decorator';
import { IUser } from '../user/interfaces/user.interface';

import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { IAnswer } from './interfaces/answer.interface';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async processMessage(@GetUser() user: IUser, @Body() messageDto: MessageDto): Promise<IAnswer> {
    return await this.chatService.processMessage(user, messageDto);
  }
}
