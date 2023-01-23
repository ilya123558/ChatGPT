import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';

import { IUser } from '../user/interfaces/user.interface';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatDto } from './dto/chat.dto';
import { IAnswer } from './interfaces/answer.interface';
import { IChat } from './interfaces/chat.interface';
import { OpenAIService } from '../openai/openai.service';

@Injectable()
export class ChatService {
  private readonly populateQuery = { path: 'user' };

  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<IChat>,
    private readonly openAIService: OpenAIService
  ) {}

  async createOrUpdate(createChatDto: CreateChatDto): Promise<IChat> {
    let chat = await this.findById(new Types.ObjectId(createChatDto.chatId));

    if (!chat) {
      const createdChat = new this.chatModel({
        user: createChatDto.user,
        name: createChatDto.chatName,
        chat: [{ entity: createChatDto.entity, message: createChatDto.message }],
      });

      chat = await createdChat.save();
    } else {
      const newChatData = {
        entity: createChatDto.entity,
        message: createChatDto.message,
      };

      await this.updateByFilterQuery(chat._id, { $push: { chat: newChatData } });
    }

    return chat;
  }

  async findById(_id: Types.ObjectId): Promise<IChat> {
    return await this.chatModel.findById(_id).populate(this.populateQuery).exec();
  }

  async updateByFilterQuery(_id: Types.ObjectId, filterQuery: FilterQuery<IChat>): Promise<IChat> {
    return await this.chatModel.findByIdAndUpdate(_id, filterQuery, { new: true }).populate(this.populateQuery).exec();
  }

  async updateByPayload(_id: Types.ObjectId, payload: Partial<IChat>): Promise<IChat> {
    return await this.chatModel.findByIdAndUpdate(_id, payload, { new: true }).populate(this.populateQuery).exec();
  }

  async deleteById(_id: Types.ObjectId): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return await this.chatModel.deleteOne({ _id });
  }

  async deleteAllByUserId(userId: Types.ObjectId): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return await this.chatModel.deleteMany({ user: userId });
  }

  async findAllByUserId(userId: Types.ObjectId): Promise<IChat[]> {
    return await this.chatModel.find({ user: userId }).populate(this.populateQuery).exec();
  }

  async processMessage(user: IUser, chatDto: ChatDto): Promise<IAnswer> {
    const answer = await this.openAIService.createCompletion(chatDto.model, chatDto.message);

    const chat = await this.createOrUpdate({ user, entity: user.name, ...chatDto });
    await this.createOrUpdate({
      user,
      entity: 'AI',
      ...chatDto,
      message: answer,
      chatId: chat._id.toString(),
    });

    return { answer, chatId: chat._id.toString(), chatName: chat.name };
  }
}
