import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

import { imageSizeEnum } from '../enums/image-size.enum';

export class CreateImageDto {
  @ApiProperty()
  @IsString()
  prompt: string;

  @ApiProperty()
  @IsNumber()
  n: number;

  @ApiProperty({ enum: imageSizeEnum })
  @IsEnum(imageSizeEnum)
  size: imageSizeEnum;
}
