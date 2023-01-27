import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoUtil } from 'src/utils/crypto.util';

import { UserSchema } from './schemas/user.schema';
import { UserSerializer } from './serializers/user.serializer';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, CryptoUtil, UserSerializer, Logger],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  exports: [UserService, UserSerializer],
})
export class UserModule {}
