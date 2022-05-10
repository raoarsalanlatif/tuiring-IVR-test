import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const env = configService.get('root.env');
  const allowedClients = configService.get('server.allowedClients');
  const port = configService.get('server.port');

  /**
   * Cors settings for the project
   * For development mode allow localhost origin
   * For prod mode allow only allowed origin
   */
  const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
      //When API playground is used, allow cors
      if (!origin) {
        return callback(null, true);
      }
      //If env is not defined assume its running in dev env
      //Whenever request is coming from localhost (http/https), allow it
      if (
        (!env || env === 'development') &&
        (origin.startsWith('http://localhost') ||
          origin.startsWith('https://localhost'))
      ) {
        return callback(null, true);
      }
      // Allow only allowed origin, if it is not defined then you should really set up
      if (
        (allowedClients && allowedClients.indexOf(origin) >= 0) ||
        env === 'production'
      ) {
        return callback(null, true);
      }
      console.log(`Origin: ${origin} blocked by cors`);
      return callback(new Error('Not allowed by CORS'));
    },
  };

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Setting swagger ui document details
   */
  const config = new DocumentBuilder()
    .setTitle('Keggel API platform')
    .setDescription('Keggel platform APIs - Developer playground')
    .setVersion('1.0')
    .addTag('Keggel')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
