import { UserSerializedDto } from 'src/module/user/dto/user-serialized.dto';

export class ChatSerializedDto {
  _id: string;
  name: string;
  chat: [{ entity: string }, { message: string }];
  user: UserSerializedDto;
}
