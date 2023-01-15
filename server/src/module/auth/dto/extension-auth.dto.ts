import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExtensionAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  address: string;
}
