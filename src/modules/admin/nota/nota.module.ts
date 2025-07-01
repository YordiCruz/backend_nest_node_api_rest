import { Module } from '@nestjs/common';
import { NotaService } from './nota.service';
import { NotaController } from './nota.controller';
import { Movimientos } from './entities/movimiento.entity';
import { Nota } from './entities/nota.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Producto } from '../inventario/producto/entities/producto.entity';
import { Almacen } from '../inventario/almacen/entities/almacen.entity';
import { EntidadComercial } from '../entidad-comercial/entities/entidad-comercial.entity';
import { AlmacenProducto } from '../inventario/almacen/entities/almacen_producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nota, Movimientos, User, Producto
    , Almacen, EntidadComercial, AlmacenProducto
  ])],
  controllers: [NotaController],
  providers: [NotaService],
})
export class NotaModule {}
