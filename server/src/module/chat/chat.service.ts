import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OpenAIApi } from 'openai';

import { configuration } from 'src/config/openai.config';
import { IUser } from '../user/interfaces/user.interface';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessageDto } from './dto/message.dto';
import { IAnswer } from './interfaces/answer.interface';
import { IChat } from './interfaces/chat.interface';

@Injectable()
export class ChatService {
  readonly OPENAI = new OpenAIApi(configuration);

  constructor(@InjectModel('Chat') private readonly chatModel: Model<IChat>) {}

  async createOrUpdate(createChatDto: CreateChatDto): Promise<IChat> {
    const chat = this.findById(createChatDto.user._id);

    if (!chat) {
      const createdChat = new this.chatModel(createChatDto);

      return await createdChat.save();
    }

    // return await this.update(createChatDto.user._id, {createChatDto.chat});
  }

  async findById(_id: Types.ObjectId): Promise<IChat> {
    return await this.chatModel.findById(_id).populate('user').exec();
  }

  async update(_id: Types.ObjectId, payload: Partial<IChat>): Promise<IChat> {
    return await this.chatModel.findByIdAndUpdate(_id, payload).exec();
  }

  async processMessage(user: IUser, messageDto: MessageDto): Promise<IAnswer> {
    try {
      const response = await this.OPENAI.createCompletion({
        model: 'text-davinci-003',
        prompt: `${messageDto.message}`,
        temperature: 0, // Higher values means the model will take more risks.
        max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
      });

      // await this.createOrUpdate({ user, name: messageDto.chatName });

      return { answer: response.data.choices[0].text };
    } catch (error) {
      throw new BadRequestException(`OPENAI_REQUEST_ERROR: ${error}`);
    }
  }
}
