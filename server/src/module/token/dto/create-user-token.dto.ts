import { IsString, IsDateString } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateUserTokenDto {
  @IsString()
  token: string;

  @IsString()
  user: mongoose.Types.ObjectId;

  @IsDateString()
  expireAt: string;
}
