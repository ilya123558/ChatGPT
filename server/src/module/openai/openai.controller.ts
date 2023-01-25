import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { APP } from 'src/config/app.config';
import { CreateImageDto } from './dto/create-image.dto';
import { OpenAIService } from './openai.service';

@ApiTags('openai')
@Controller('openai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('create/image')
  @UseGuards(AuthGuard(APP.JWT))
  async createImage(@Body() createImageDto: CreateImageDto): Promise<string> {
    return await this.openAIService.createImage(createImageDto.prompt);
  }

  @Get('models')
  async findAllModels(): Promise<String[]> {
    return await this.openAIService.findAllModels();
  }
}
