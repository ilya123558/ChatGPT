import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenSchema } from './schemas/user-token.schema';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  imports: [MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }])],
  exports: [TokenService],
})
export class TokenModule {}
