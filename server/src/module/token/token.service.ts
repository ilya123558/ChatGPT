import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUserToken } from './interfaces/user-token.interface';
import { CreateUserTokenDto } from './dto/create-user-token.dto';

@Injectable()
export class TokenService {
  constructor(@InjectModel('Token') private readonly tokenModel: Model<IUserToken>) {}

  async create(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
    const userToken = new this.tokenModel(createUserTokenDto);

    return await userToken.save();
  }

  async deleteAll(userId: string): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return this.tokenModel.deleteMany({ userId });
  }

  async exists(userId: string, token: string): Promise<Pick<IUserToken, '_id'>> {
    return this.tokenModel.exists({ userId, token });
  }
}
