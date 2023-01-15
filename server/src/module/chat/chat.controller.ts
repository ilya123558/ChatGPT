import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { IAnswer } from './interfaces/answer.interface';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async processMessage(@Body() messageDto: MessageDto): Promise<IAnswer> {
    return await this.chatService.processMessage(messageDto);
  }
}
