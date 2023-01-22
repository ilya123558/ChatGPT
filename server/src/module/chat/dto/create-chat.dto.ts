import { IUser } from 'src/module/user/interfaces/user.interface';
import { ChatDto } from './chat.dto';

export class CreateChatDto extends ChatDto {
  user: IUser;
  entity: string;
}
