import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './entities/nota.entity';
import { Movimientos } from './entities/movimiento.entity';
import { User } from '../users/entities/user.entity';
import { Producto } from '../inventario/producto/entities/producto.entity';
import { Almacen } from '../inventario/almacen/entities/almacen.entity';
import { EntidadComercial } from '../entidad-comercial/entities/entidad-comercial.entity';

@Injectable()
export class NotaService {

  constructor(
    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>,
    @InjectRepository(Movimientos)
    private readonly movimientoRepository: Repository<Movimientos>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Almacen)
    private readonly almacenRepository: Repository<Almacen>,
    @InjectRepository(EntidadComercial)
    private readonly entidadComercialRepository: Repository<EntidadComercial>,


  ) {}

  async create(createNotaDto: CreateNotaDto) {
  // Trabajar con transacciones

    const user = await this.userRepository.findOneBy({id: createNotaDto.user_id});
    if(!user){
      throw new NotFoundException('El usuario no se encontro');
    }

    //buscar la entidad comercial
    const entidad = await this.entidadComercialRepository.findOneBy({id: createNotaDto.entidad_comercial_id});
    if(!entidad ){
       throw new NotFoundException('La entidad comercial no se encontro');
     }

    //crear la nota
    const nota = await this.notaRepository.create({
      ...CreateNotaDto, 
    entidad_comercial_id: entidad,
    user: user,
    movimientos: []
    
    });
    
    for (const movi of createNotaDto.movimientos) {
      const producto = await this.productoRepository.findOneBy({id: movi.producto_id});
       if(!producto){
      throw new NotFoundException('El producto no se encontro');}

      //almacen
      const almacen = await this.almacenRepository.findOneBy({id: movi.almacen_id});
      if(!almacen){
        throw new NotFoundException('El almacen no se encontro');
      }
      const movimiento = await this.movimientoRepository.create({
        ...movi, 
        producto: producto,
        almacen: almacen,
        nota: nota
      });

      nota.movimientos.push(movimiento);

    }


    return await this.notaRepository.save(nota);
  }

  findAll() {
    return `This action returns all nota`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nota`;
  }

  update(id: number, updateNotaDto: UpdateNotaDto) {
    return `This action updates a #${id} nota`;
  }

  remove(id: number) {
    return `This action removes a #${id} nota`;
  }
}
