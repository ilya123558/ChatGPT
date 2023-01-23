import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { OpenAIApi } from 'openai';

import { configuration } from 'src/config/openai.config';

@Injectable()
export class OpenAIService {
  readonly OPENAI = new OpenAIApi(configuration);

  constructor(private readonly logger: Logger) {}

  async findAllModels(): Promise<String[]> {
    let response;

    try {
      response = await this.OPENAI.listModels();
    } catch (error) {
      throw new BadRequestException(`OPENAI_REQUEST_ERROR: ${error}`);
    }

    return response.data.data.map(model => model.id);
  }

  async createCompletion(model: string, prompt: string): Promise<string> {
    let completion: string;

    try {
      const response = await this.OPENAI.createCompletion({
        model: model ? model : 'text-davinci-003',
        prompt: prompt,
        temperature: 1, // Higher values means the model will take more risks.
        max_tokens: 1800, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        // top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        // frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        // presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
      });

      completion = response.data.choices[0].text;
    } catch (error) {
      this.logger.error(`OPENAI_COMPLETION_REQUEST_ERROR: ${error}`);
      throw new BadRequestException(`OPENAI_COMPLETION_REQUEST_ERROR: ${error}`);
    }

    return completion.trimStart();
  }

  async createImage(prompt: string) {
    let imageURL: string;

    try {
      imageURL = (
        await this.OPENAI.createImage({
          prompt: prompt,
          n: 1,
          size: `512x512`,
        })
      ).data.data[0].url;
    } catch (error) {
      this.logger.error(`OPENAI_IMAGE_CREATION_REQUEST_ERROR: ${error}`);
      throw new BadRequestException(`OPENAI_IMAGE_CREATION_REQUEST_ERROR: ${error}`);
    }

    return imageURL;
  }
}
