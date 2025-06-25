import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sucursal } from './entities/sucursal.entity';

@Injectable()
export class SucursalService {
  constructor (
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
  ) {}
  create(createSucursalDto: CreateSucursalDto) {
    const sucursal = this.sucursalRepository.create(createSucursalDto);
    return this.sucursalRepository.save(sucursal);
  }

  findAll() {
    return this.sucursalRepository.find();
  }

  async findOne(id: number) {
    const sucursal = await this.sucursalRepository.findOneBy({id});
    if (!sucursal) {
      throw new NotFoundException(`La sucursal no existe`);
    }
    return sucursal;
  }

  async update(id: number, updateSucursalDto: UpdateSucursalDto) {
    const sucursal = await this.findOne(id);
    this.sucursalRepository.merge(sucursal, updateSucursalDto);
   return this.sucursalRepository.save(sucursal);
  }

  async remove(id: number) {
    const sucursal = await this.findOne(id);
    await this.sucursalRepository.remove(sucursal);
     
  }
}
