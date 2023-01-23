import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModule } from './config.root';
import { ChatModule } from './module/chat/chat.module';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { TokenModule } from './module/token/token.module';
import { OpenAIModule } from './module/openai/openai.module';

@Module({
  imports: [
    configModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ChatModule,
    AuthModule,
    UserModule,
    TokenModule,
    OpenAIModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
