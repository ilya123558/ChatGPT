import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { OpenAIApi } from 'openai';

import { configuration } from 'src/config/openai.config';
import { IUser } from '../user/interfaces/user.interface';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatDto } from './dto/chat.dto';
import { IAnswer } from './interfaces/answer.interface';
import { IChat } from './interfaces/chat.interface';

@Injectable()
export class ChatService {
  private readonly populateQuery = { path: 'user' };
  readonly OPENAI = new OpenAIApi(configuration);

  constructor(@InjectModel('Chat') private readonly chatModel: Model<IChat>) {}

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
    let answer: string;

    try {
      const response = await this.OPENAI.createCompletion({
        model: `${chatDto.model ? chatDto.model : 'text-davinci-003'}`,
        prompt: `${chatDto.message}`,
        temperature: 0, // Higher values means the model will take more risks.
        max_tokens: 1800, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        // top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        // frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        // presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
      });

      answer = response.data.choices[0].text;
    } catch (error) {
      throw new BadRequestException(`OPENAI_REQUEST_ERROR: ${error}`);
    }

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

  async findAllModels(): Promise<String[]> {
    let response;

    try {
      response = await this.OPENAI.listModels();
    } catch (error) {
      throw new BadRequestException(`OPENAI_REQUEST_ERROR: ${error}`);
    }

    return response.data.data.map(model => model.id);
  }
}
