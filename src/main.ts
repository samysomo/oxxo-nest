import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors : {
      origin: [
        'http://localhost:3000', // desarrollo local
        'https://oxxo-front-d39q3sw3v-samysomos-projects.vercel.app', // producción
    ],
      credentials: true
    }
  });
  app.use(cookieParser())
  const config = new DocumentBuilder()
    .setTitle('Oxxo API')
    .setDescription('API for oxxo management')
    .setVersion('0.9')
    .addTag('Routes')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  await app.listen(4000);
}
bootstrap();
