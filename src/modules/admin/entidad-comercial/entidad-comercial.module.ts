import { Module } from '@nestjs/common';
import { EntidadComercialService } from './entidad-comercial.service';
import { EntidadComercialController } from './entidad-comercial.controller';

@Module({
  controllers: [EntidadComercialController],
  providers: [EntidadComercialService],
})
export class EntidadComercialModule {}
