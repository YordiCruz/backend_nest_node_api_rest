import { Module } from '@nestjs/common';
import { NotaService } from './nota.service';
import { NotaController } from './nota.controller';
import { Movimientos } from './entities/movimiento.entity';

@Module({
  imports: [Movimientos],
  controllers: [NotaController],
  providers: [NotaService],
})
export class NotaModule {}
