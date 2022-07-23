import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('server.port');

  app.useGlobalPipes(new ValidationPipe());

  /**
   * Setting swagger ui document details
   */
  const config = new DocumentBuilder()
    .setTitle('tuiring-IVR-test API platform')
    .setDescription('tuiring-IVR-test platform APIs - Developer playground')
    .setVersion('1.0')
    .addTag('tuiring-IVR-test')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
