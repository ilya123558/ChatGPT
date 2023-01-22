import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChatDto {
  @ApiProperty()
  chatId: string;

  @ApiProperty()
  @IsString()
  chatName: string;

  @ApiProperty()
  @IsString()
  message: string;
}
