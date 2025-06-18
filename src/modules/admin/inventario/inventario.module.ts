import { Module } from '@nestjs/common';
import { ProductoModule } from './producto/producto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { AlmacenModule } from './almacen/almacen.module';
import { SucursalModule } from './sucursal/sucursal.module';

@Module({
  imports: [ProductoModule, CategoriaModule, AlmacenModule, SucursalModule]
})
export class InventarioModule {}
