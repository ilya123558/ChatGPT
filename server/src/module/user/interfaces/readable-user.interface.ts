import { Types } from 'mongoose';

import { IUser } from './user.interface';

export interface IReadableUser extends IUser {
  _id?: Types.ObjectId;
  __v?: string;
  accessToken?: string;
}
