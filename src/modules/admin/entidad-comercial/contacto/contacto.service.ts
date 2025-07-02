import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacto } from '../entities/contacto.entity';
import { Repository } from 'typeorm';
import { EntidadComercial } from '../entities/entidad-comercial.entity';
import { CreateContactoDto } from '../dto/create-contacto.dto';

@Injectable()
export class ContactoService {
    constructor(
        @InjectRepository(Contacto)
        private readonly contactoRepository: Repository<Contacto>,
        @InjectRepository(EntidadComercial)
        private readonly entidadComercialRepository: Repository<EntidadComercial>,
    ) {}

    async create(createContactoDto: CreateContactoDto) {
        const entidad = this.entidadComercialRepository.findOneBy({id: createContactoDto.entidad_comercial_id});
        
        const contacto = this.contactoRepository.create({
          ...createContactoDto

        });
       

        return await this.contactoRepository.save(contacto);
      }
    
     async findAll() {
        return await this.contactoRepository.find();
      }
    
       async findOne(id: number) {
        const contacto = await this.contactoRepository.findOneBy({id});
        if (!contacto) {
          throw new NotFoundException(`Contacto no encontrado`); 
        }
        return contacto;
      }
    
      async update(id: number, updateContactoDto: CreateContactoDto) {
       const contacto = await this.findOne(id);
       if (updateContactoDto.entidad_comercial_id) {
         const entidad = await this.entidadComercialRepository.findOneBy({id: updateContactoDto.entidad_comercial_id});
         if (!entidad) throw new NotFoundException(`La entidad comercial no existe`);

       }
       Object.assign(contacto, updateContactoDto);
        return await this.contactoRepository.save(contacto);
      }
    
     async remove(id: number) {
        const contacto = await this.findOne(id);
      //  contacto.activo = false;
        //await this.contactoRepository.remove(contacto);
      }
}
