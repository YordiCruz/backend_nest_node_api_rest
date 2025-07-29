import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // class validator
   app.useGlobalPipes(new ValidationPipe());

   //swagger

   const config = new DocumentBuilder()
   .addBearerAuth()
   .setTitle('Backend API (Inventarios y Movimientos)')
   .setDescription('Servicio Api rest Backend')
   .setVersion('1.0')
   //.addTag('api rest')
   .build();

   const documentFactory = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('docs', app, documentFactory);


   //end swagger


    // Esta línea sirve la carpeta uploads
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  
  //aqui se puede proteger las rutas, {}
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
