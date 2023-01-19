import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatSchema } from './schemas/chat.schema';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }])],
})
export class ChatModule {}
