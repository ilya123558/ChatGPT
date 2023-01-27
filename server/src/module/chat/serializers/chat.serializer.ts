import { Injectable } from '@nestjs/common';

import { UserSerializer } from 'src/module/user/serializers/user.serializer';
import { ChatSerializedDto } from '../dto/chat-serialized.dto';
import { IChat } from '../interfaces/chat.interface';

@Injectable()
export class ChatSerializer {
  public constructor(private readonly userSerializer: UserSerializer) {}

  public serialize(entity: IChat): ChatSerializedDto {
    const user = this.userSerializer.serialize(entity.user);

    return {
      _id: entity._id,
      name: entity.name,
      chat: entity.chat,
      user,
    };
  }

  public serializeCollection(chats: IChat[]): ChatSerializedDto[] {
    return chats.map(chat => this.serialize(chat));
  }
}
