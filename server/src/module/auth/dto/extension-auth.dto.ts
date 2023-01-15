import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExtensionAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  signed: string;

  @ApiProperty()
  @IsNotEmpty()
  signature: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;
}
