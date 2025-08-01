import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/admin/users/users.module';
import { User } from './modules/admin/users/entities/user.entity';
import { RolesModule } from './modules/admin/roles/roles.module';
import { PermissionsModule } from './modules/admin/permissions/permissions.module';
import { Role } from './modules/admin/roles/entities/role.entity';
import { Permission } from './modules/admin/permissions/entities/permission.entity';
import { AuthModule } from './modules/auth/auth.module';
import { PersonasModule } from './modules/admin/personas/personas.module';
import { EntidadComercialModule } from './modules/admin/entidad-comercial/entidad-comercial.module';
import { InventarioModule } from './modules/admin/inventario/inventario.module';
import { Categoria } from './modules/admin/inventario/categoria/entities/categoria.entity';
import { Producto } from './modules/admin/inventario/producto/entities/producto.entity';
import { Almacen } from './modules/admin/inventario/almacen/entities/almacen.entity';
import { Sucursal } from './modules/admin/inventario/sucursal/entities/sucursal.entity';
import { NotaModule } from './modules/admin/nota/nota.module';
import { MulterModule } from '@nestjs/platform-express';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  //aqui habilitamos el dotenv para las variables de entorno
  imports: [

     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

     MulterModule.register({
      dest: './uploads', // Carpeta donde se guardarán las imágenes
    }),

    ConfigModule.forRoot({
    //si no se especifica la ruta por defecto busca el .env
    envFilePath: '.development.env',
   }),
   TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5436, // se indica el puerto con el que se conectara a la base de datos de postgres
    username: 'postgres',
    password: 'admin123',
    database: 'bd_backend_nest2',
    entities:[
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: false //cada q creamos una entidad se sincroniza automaticamente, no debe de usarse en produccion
    
       }),
   UsersModule,
   RolesModule,
   PermissionsModule,
   AuthModule,
   PersonasModule,
   EntidadComercialModule,
   InventarioModule,
   NotaModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
