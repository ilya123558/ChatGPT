import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { APP } from 'src/config/app.config';
import { OpenAIService } from './openai.service';

@ApiTags('openai')
@Controller('openai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('create/image/:prompt')
  @UseGuards(AuthGuard(APP.JWT))
  async createImage(@Param('prompt') prompt: string): Promise<string> {
    return await this.openAIService.createImage(prompt);
  }

  @Get('models')
  async findAllModels(): Promise<String[]> {
    return await this.openAIService.findAllModels();
  }
}
