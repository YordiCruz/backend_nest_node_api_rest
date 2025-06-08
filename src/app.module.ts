import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //aqui habilitamos el dotenv para las variables de entorno
  imports: [ConfigModule.forRoot({
    //si no se especifica la ruta por defecto busca el .env
    envFilePath: '.development.env',
   }),
   TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5436, // el puerto podemos cambiar
    username: 'postgres',
    password: 'admin123',
    database: 'bd_backend_nest2',
    entities:[],
    synchronize: false //cada q creamos una entidad se sincroniza automaticamente, no debe de usarse en produccion
    
       })
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
