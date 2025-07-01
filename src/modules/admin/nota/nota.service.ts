import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
import { AlmacenProducto } from '../inventario/almacen/entities/almacen_producto.entity';

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
    @InjectRepository(AlmacenProducto)
    private readonly almacenProductoRepository: Repository<AlmacenProducto>,

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
    ...createNotaDto, 
    entidad_comercial_id: entidad,
    user: user
    //movimientos: []
    
    });
    
    // guardar la nota primero para obtener el id para luego relacionar con los movimientos
    await this.notaRepository.save(nota);

     const movimientosGuardados: Movimientos[] = [];

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
        nota: nota,
        producto: producto,
        almacen: almacen
      });

      // llamar a la funcion para actualizar el stock
      await this.actualizarStock(almacen, producto, movi.cantidad, movi.tipo_movimientos);

      const movimientoGuardado = await this.movimientoRepository.save(movimiento)
     movimientosGuardados.push(movimientoGuardado);

      //nota.movimientos.push(movimiento);
  }

     nota.movimientos = movimientosGuardados;

    //return await this.notaRepository.save(nota);

    return nota;
  }

  private async actualizarStock(almacen: Almacen, producto: Producto, cantidad: number, tipo: 'ingreso' | 'salida' | 'devolucion') {
    let almacenProducto = await this.almacenProductoRepository.findOne({
      where: {
        almacen: { id: almacen.id },
        productos: { id: producto.id }
      },
      relations: ['almacen', 'producto']
    });

    if (!almacenProducto) {
      if (tipo === 'salida') {
        throw new NotFoundException('No hay stock registrado para el producto en el almacen');
      }
      almacenProducto = this.almacenProductoRepository.create({
        almacen: almacen, productos: producto,
        cantidad_actual: cantidad,
        fecha_actualizacion: new Date(),
      });
      await this.almacenProductoRepository.save(almacenProducto);
    
    }else {
      if(tipo === 'ingreso' || tipo === 'devolucion'){
        almacenProducto.cantidad_actual += cantidad;
      }else if (tipo === 'salida') {
        if (almacenProducto.cantidad_actual < cantidad) {
          throw new BadRequestException('No hay stock registrado para el producto en el almacen para la salida');
        }
        almacenProducto.cantidad_actual -= cantidad;
      }
      almacenProducto.fecha_actualizacion = new Date();
    }
    
    await this.almacenProductoRepository.save(almacenProducto);
  
  }

  findAll() {
    return `This action returns all nota`;
  }

  findOne(id: number) {
    return this.notaRepository.findOne({where: {id}, 
    relations: ['movimientos']
    });
  }

  update(id: number, updateNotaDto: UpdateNotaDto) {
    return `This action updates a #${id} nota`;
  }

  remove(id: number) {
    return `This action removes a #${id} nota`;
  }
}
