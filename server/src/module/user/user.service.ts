import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

import { stripAddress } from 'src/utils/common.util';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>, private readonly logger: Logger) {}

  async create(address: string): Promise<IUser> {
    const createdUser = new this.userModel({
      name: stripAddress(address),
      address: address,
      nonce: uuidV4(),
    });

    const user = await createdUser.save();

    this.logger.log(`USER_CREATED: ${JSON.stringify(user)}`);

    return user;
  }

  async findById(id: string): Promise<IUser> {
    return this.userModel.findById(id).exec();
  }

  async findByAddress(address: string): Promise<IUser> {
    return await this.userModel.findOne({ address }).exec();
  }

  async updateNonce(_id: Types.ObjectId): Promise<IUser> {
    return this.update(_id, { nonce: uuidV4() });
  }

  private async update(_id: Types.ObjectId, payload: Partial<IUser>): Promise<IUser> {
    return await this.userModel.findOneAndUpdate({ _id }, payload, { new: true, runValidators: true }).exec();
  }
}
