import { IUser } from 'src/module/user/interfaces/user.interface';

export class CreateChatDto {
  user: IUser;
  name: string;
  chat: [{ entity: string }, { message: string }];
}
