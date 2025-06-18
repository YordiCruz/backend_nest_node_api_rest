import { Injectable } from '@nestjs/common';
import { CreateEntidadComercialDto } from './dto/create-entidad-comercial.dto';
import { UpdateEntidadComercialDto } from './dto/update-entidad-comercial.dto';

@Injectable()
export class EntidadComercialService {
  create(createEntidadComercialDto: CreateEntidadComercialDto) {
    return 'This action adds a new entidadComercial';
  }

  findAll() {
    return `This action returns all entidadComercial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entidadComercial`;
  }

  update(id: number, updateEntidadComercialDto: UpdateEntidadComercialDto) {
    return `This action updates a #${id} entidadComercial`;
  }

  remove(id: number) {
    return `This action removes a #${id} entidadComercial`;
  }
}
