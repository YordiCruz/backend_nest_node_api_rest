import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Nota } from './entities/nota.entity';
import { Movimientos } from './entities/movimiento.entity';
import { User } from '../users/entities/user.entity';
import { Producto } from '../inventario/producto/entities/producto.entity';
import { Almacen } from '../inventario/almacen/entities/almacen.entity';
import { EntidadComercial } from '../entidad-comercial/entities/entidad-comercial.entity';
import { AlmacenProducto } from '../inventario/almacen/entities/almacen_producto.entity';
import { FiltroNotaDto } from './dto/filtro-nota';

@Injectable()
export class NotaService {

  constructor(
    //para transacciones
    @InjectDataSource()
    private readonly dataSource: any,
    //

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

  // Lo trabajamos con transacciones

  async create(createNotaDto: CreateNotaDto) {
  // Trabajar con transacciones

  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  
  try {
    
    const userRepo = queryRunner.manager.getRepository(User);
    const entidadRepo = queryRunner.manager.getRepository(EntidadComercial);
    const notaRepo = queryRunner.manager.getRepository(Nota);
    const productoRepo = queryRunner.manager.getRepository(Producto);
    const movimientoRepo = queryRunner.manager.getRepository(Movimientos);
    const almacenRepo = queryRunner.manager.getRepository(Almacen);
   // const almacenProductoRepo = queryRunner.manager.getRepository(AlmacenProducto);     
    const user = await userRepo.findOneBy({id: createNotaDto.user_id});
    if(!user){
      throw new NotFoundException('El usuario no se encontro');
    }
    
     //buscar la entidad comercial
    const entidad = await entidadRepo.findOneBy({id: createNotaDto.entidad_comercial_id});
    if(!entidad ){
       throw new NotFoundException('La entidad comercial no se encontro');
     }


    //crear la nota
    const nota = await notaRepo.create({
    ...createNotaDto, 
    entidad_comercial_id: entidad,
    user: user
    //movimientos: []
    
    });

    
    // guardar la nota primero para obtener el id para luego relacionar con los movimientos
    await notaRepo.save(nota);


     const movimientosGuardados: Movimientos[] = [];

    for (const movi of createNotaDto.movimientos) {
      const producto = await productoRepo.findOneBy({id: movi.producto_id});
       if(!producto){
      throw new NotFoundException('El producto no se encontro');}

      //almacen
      const almacen = await almacenRepo.findOneBy({id: movi.almacen_id});
      if(!almacen){
        throw new NotFoundException('El almacen no se encontro');
      }
      const movimiento = await movimientoRepo.create({
        ...movi, 
        nota: nota,
        producto: producto,
        almacen: almacen
      });

      // llamar a la funcion para actualizar el stock
      await this.actualizarStockWithQueryRunner(queryRunner, almacen, producto, movi.cantidad, movi.tipo_movimientos);

      const movimientoGuardado = await movimientoRepo.save(movimiento)
     movimientosGuardados.push(movimientoGuardado);

      //nota.movimientos.push(movimiento);
  }

     nota.movimientos = movimientosGuardados;


    await queryRunner.commitTransaction();

    return nota;

  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;    
  }finally {

    await queryRunner.release();
  
  }

  }

  private async actualizarStockWithQueryRunner(queryRunner: QueryRunner, almacen: Almacen, producto: Producto, cantidad: number, tipo: 'ingreso' | 'salida' | 'devolucion') {
    
    const almacenProductoRepo = queryRunner.manager.getRepository(AlmacenProducto);
    
    let almacenProducto = await almacenProductoRepo.findOne({
      where: {
        almacen: { id: almacen.id },
        productos: { id: producto.id }
      },
      relations: ['almacen', 'productos']
    });

    if (!almacenProducto) {
      if (tipo === 'salida') {
        throw new NotFoundException('No hay stock registrado para el producto en el almacen');
      }
      almacenProducto = almacenProductoRepo.create({
        almacen: almacen, 
        productos: producto,
        cantidad_actual: cantidad,
        fecha_actualizacion: new Date(),
      });
      await almacenProductoRepo.save(almacenProducto);
    
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
    
    await almacenProductoRepo.save(almacenProducto);
  
  }







  // async create(createNotaDto: CreateNotaDto) {
  // // Trabajar con transacciones

  //   const user = await this.userRepository.findOneBy({id: createNotaDto.user_id});
  //   if(!user){
  //     throw new NotFoundException('El usuario no se encontro');
  //   }

  //   //buscar la entidad comercial
  //   const entidad = await this.entidadComercialRepository.findOneBy({id: createNotaDto.entidad_comercial_id});
  //   if(!entidad ){
  //      throw new NotFoundException('La entidad comercial no se encontro');
  //    }

  //   //crear la nota
  //   const nota = await this.notaRepository.create({
  //   ...createNotaDto, 
  //   entidad_comercial_id: entidad,
  //   user: user
  //   //movimientos: []
    
  //   });
    
  //   // guardar la nota primero para obtener el id para luego relacionar con los movimientos
  //   await this.notaRepository.save(nota);

  //    const movimientosGuardados: Movimientos[] = [];

  //   for (const movi of createNotaDto.movimientos) {
  //     const producto = await this.productoRepository.findOneBy({id: movi.producto_id});
  //      if(!producto){
  //     throw new NotFoundException('El producto no se encontro');}

  //     //almacen
  //     const almacen = await this.almacenRepository.findOneBy({id: movi.almacen_id});
  //     if(!almacen){
  //       throw new NotFoundException('El almacen no se encontro');
  //     }
  //     const movimiento = await this.movimientoRepository.create({
  //       ...movi, 
  //       nota: nota,
  //       producto: producto,
  //       almacen: almacen
  //     });

  //     // llamar a la funcion para actualizar el stock
  //     await this.actualizarStock(almacen, producto, movi.cantidad, movi.tipo_movimientos);

  //     const movimientoGuardado = await this.movimientoRepository.save(movimiento)
  //    movimientosGuardados.push(movimientoGuardado);

  //     //nota.movimientos.push(movimiento);
  // }

  //    nota.movimientos = movimientosGuardados;

  //   //return await this.notaRepository.save(nota);

  //   return nota;
  // }

  // private async actualizarStock(almacen: Almacen, producto: Producto, cantidad: number, tipo: 'ingreso' | 'salida' | 'devolucion') {
  //   let almacenProducto = await this.almacenProductoRepository.findOne({
  //     where: {
  //       almacen: { id: almacen.id },
  //       productos: { id: producto.id }
  //     },
  //     relations: ['almacen', 'productos']
  //   });

  //   if (!almacenProducto) {
  //     if (tipo === 'salida') {
  //       throw new NotFoundException('No hay stock registrado para el producto en el almacen');
  //     }
  //     almacenProducto = this.almacenProductoRepository.create({
  //       almacen: almacen, 
  //       productos: producto,
  //       cantidad_actual: cantidad,
  //       fecha_actualizacion: new Date(),
  //     });
  //     await this.almacenProductoRepository.save(almacenProducto);
    
  //   }else {
  //     if(tipo === 'ingreso' || tipo === 'devolucion'){
  //       almacenProducto.cantidad_actual += cantidad;
  //     }else if (tipo === 'salida') {
  //       if (almacenProducto.cantidad_actual < cantidad) {
  //         throw new BadRequestException('No hay stock registrado para el producto en el almacen para la salida');
  //       }
  //       almacenProducto.cantidad_actual -= cantidad;
  //     }
  //     almacenProducto.fecha_actualizacion = new Date();
  //   }
    
  //   await this.almacenProductoRepository.save(almacenProducto);
  
  // }

 async findAll(filtro: FiltroNotaDto) {
    const query = this.notaRepository.createQueryBuilder('nota')
                    .leftJoinAndSelect('nota.user', 'user')
                    .leftJoinAndSelect('nota.entidad_comercial_id', 'entidad')
                    .leftJoinAndSelect('nota.movimientos', 'movimientos')
                    .leftJoinAndSelect('movimientos.producto', 'producto')
      
       if (filtro.tipo_nota) {
        query.andWhere('nota.tipo_nota = :tipo_nota', { tipo_nota: filtro.tipo_nota });
        
      }
         if (filtro.estado_nota) {
        query.andWhere('nota.estado_nota = :estado_nota', { estado_nota: filtro.estado_nota });
        
      }

         if (filtro.desde) {
        query.andWhere('nota.fecha_emision >= :desde', { desde: filtro.desde });
      }

       if (filtro.hasta) {
        query.andWhere('nota.fecha_emision <= :hasta', { hasta: filtro.hasta });
      }

       if (filtro.user_id) {
        query.andWhere('user.id = :user_id', { user_id: filtro.user_id });
      }

       if (filtro.entidad_comercial_id) {
        query.andWhere('entidad.id = :entidad_comercial_id', { entidad_comercial_id: filtro.entidad_comercial_id });
      }

      //paginacion
      const limit = filtro.limit || 10;
      const page = filtro.page || 1;

      query.skip(page).take(limit);

      const [data, total] = await query.getManyAndCount();

      query.orderBy('nota.fecha_emision', 'DESC');
      return {data, total};
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
