import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OpenAIModule } from '../openai/openai.module';
import { UserSerializer } from '../user/serializers/user.serializer';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatSchema } from './schemas/chat.schema';
import { ChatSerializer } from './serializers/chat.serializer';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatSerializer, UserSerializer],
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]), OpenAIModule],
})
export class ChatModule {}
