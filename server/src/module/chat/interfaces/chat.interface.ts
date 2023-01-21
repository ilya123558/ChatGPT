import { PopulatedDoc, Document } from 'mongoose';

import { IUser } from 'src/module/user/interfaces/user.interface';

export interface IChat extends Document {
  user: PopulatedDoc<IUser>;
  name: string;
  chat: [{ entity: string }, { message: string }];
}
