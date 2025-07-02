import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntidadComercialDto } from './dto/create-entidad-comercial.dto';
import { UpdateEntidadComercialDto } from './dto/update-entidad-comercial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntidadComercial } from './entities/entidad-comercial.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntidadComercialService {

  constructor(
    @InjectRepository(EntidadComercial)
    private readonly entidadComercialRepository: Repository<EntidadComercial>,

  ) {}
 async create(createEntidadComercialDto: CreateEntidadComercialDto) {
    const entidad = this.entidadComercialRepository.create(createEntidadComercialDto);
    return await this.entidadComercialRepository.save(entidad);
  }

 async findAll() {
    return await this.entidadComercialRepository.find({relations: ['contactos']});
  }

   async findOne(id: number) {
    const entidad = await this.entidadComercialRepository.findOne({where: {id}, relations: ['contactos']});
    if (!entidad) {
      throw new NotFoundException(`La entidad comercial no encontrada`); 
    }
    return entidad;
  }

  async update(id: number, updateEntidadComercialDto: UpdateEntidadComercialDto) {
   const entidad = await this.findOne(id);
   const entidadActualizada = Object.assign(entidad, updateEntidadComercialDto);
    return await this.entidadComercialRepository.save(entidadActualizada);
  }

 async remove(id: number) {
    const entidad = await this.findOne(id);
    entidad.activo = false;
    await this.entidadComercialRepository.remove(entidad);
  }
}
