import { IUser } from './user.interface';
import { Types } from 'mongoose';

export interface IReadableUser extends IUser {
  _id?: Types.ObjectId;
  __v?: string;
  accessToken?: string;
}
