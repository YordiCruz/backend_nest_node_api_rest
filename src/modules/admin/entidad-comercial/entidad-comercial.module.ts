import { Module } from '@nestjs/common';
import { EntidadComercialService } from './entidad-comercial.service';
import { EntidadComercialController } from './entidad-comercial.controller';
import { ContactoService } from './contacto/contacto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadComercial } from './entities/entidad-comercial.entity';
import { Contacto } from './entities/contacto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntidadComercial, Contacto])],
  controllers: [EntidadComercialController],
  providers: [EntidadComercialService, ContactoService],
})
export class EntidadComercialModule {}
