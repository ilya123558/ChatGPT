import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { OpenAIApi } from 'openai';

import { configuration, OPENAIConfig } from 'src/config/openai.config';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class OpenAIService {
  readonly OPENAI = new OpenAIApi(configuration);

  constructor(private readonly logger: Logger) {}

  async findAllModels(): Promise<string[]> {
    let models: string[];

    try {
      const response = await this.OPENAI.listModels();

      models = response.data.data.map(model => model.id);
    } catch (error) {
      this.logger.error(`OPENAI_MODELS_REQUEST_ERROR: ${error}`);
      throw new BadRequestException(`OPENAI_REQUEST_ERROR: ${error}`);
    }

    return models;
  }

  async createCompletion(model: string, prompt: string): Promise<string> {
    let completion: string;

    try {
      const response = await this.OPENAI.createCompletion({
        model: model ? model : 'text-davinci-003',
        prompt: prompt,
        ...OPENAIConfig,
      });

      completion = response.data.choices[0].text;
    } catch (error) {
      this.logger.error(`OPENAI_COMPLETION_REQUEST_ERROR: ${error}`);
      throw new BadRequestException(`OPENAI_COMPLETION_REQUEST_ERROR: ${error}`);
    }

    return completion.trimStart();
  }

  async createImage(createImageDto: CreateImageDto): Promise<string[]> {
    let imageURLs: string[];

    try {
      const response = await this.OPENAI.createImage(createImageDto);

      imageURLs = response.data.data.map(data => data.url);
    } catch (error) {
      this.logger.error(`OPENAI_IMAGE_CREATION_REQUEST_ERROR: ${error}`);
      throw new BadRequestException(`OPENAI_IMAGE_CREATION_REQUEST_ERROR: ${error}`);
    }

    return imageURLs;
  }
}
