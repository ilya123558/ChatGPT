import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import cors from 'cors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      levels: winston.config.syslog.levels,
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
        new winston.transports.File({
          filename: `${process.env.LOG_PATH}combined.log`,
          level: 'info',
          format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
        }),
        new winston.transports.File({
          filename: `${process.env.LOG_PATH}errors.log`,
          level: 'error',
          format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
        }),
      ],
    }),
  });

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('ChatGPT')
    .setDescription('ChatGPT API by chezetti & ilysha34sm')
    .setVersion('1.0')
    .addTag('chatgpt')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  app.use(cookieParser());
  app.enableCors(cors);

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
