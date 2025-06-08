import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  //aqui habilitamos el dotenv para las variables de entorno
  imports: [ConfigModule.forRoot({
    //si no se especifica la ruta por defecto busca el .env
    envFilePath: '.development.env',
   })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
