import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangeNameDto {
  @ApiProperty()
  @IsString()
  chatId: string;

  @ApiProperty()
  @IsString()
  name: string;
}
