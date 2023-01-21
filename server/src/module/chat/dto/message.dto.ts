import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MessageDto {
  @ApiProperty()
  @IsString()
  chatName: string;

  @ApiProperty()
  @IsString()
  message: string;
}
