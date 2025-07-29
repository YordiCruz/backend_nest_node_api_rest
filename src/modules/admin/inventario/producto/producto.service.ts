import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Repository } from 'typeorm';
import { PaginatedProductoResponseDto } from './dto/paginated-producto-response.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}
  async create(createProductoDto: CreateProductoDto) {
    //verificar si la categoria existe
    const categoria = await this.categoriaRepository.findOne({where: {id: createProductoDto.categoriaId}})
    if (!categoria) throw new NotFoundException(`La categoria no existe`);
   
    const producto = this.productoRepository.create({
      ...createProductoDto,
       categoria,
       activo: createProductoDto.activo !== undefined ? createProductoDto.activo : true
      });
    return this.productoRepository.save(producto);
  }

async subidaImagen(file: Express.Multer.File, id: number) {
  // ... validaciones existentes
  
  // Normaliza la ruta completamente
  const imagenUrl = `uploads/${file.filename}`.replace(/\\/g, '/');
  
  const producto = await this.findOne(id);
  producto.imagen_url = imagenUrl;
  await this.productoRepository.save(producto);
  
  return {
    message: 'Archivo subido',
    filepath: imagenUrl // Devuelve la ruta normalizada
  };
}

  // async subidaImagen(file: Express.Multer.File, id: number) {
  //   if(!file) throw new BadRequestException('No existe la imagen');

  //   //validar
  //   const vali = ['image/jpeg', 'image/png', 'image/jpg'];
  //   if(!vali.includes(file.mimetype)) throw new BadRequestException('Formato de imagen no valido');
    
  //   // validar tamaño de archivo
  //   const maxSize = 5 * 1024 * 1024;
  //   if (file.size > maxSize) {
  //     throw new BadRequestException('El archivo debe ser menor a 5MB');
  //   }
    
  //   const producto = await this.findOne(id);
  //   producto.imagen_url = file.path.replace('\\', '/');
  //  this.productoRepository.save(producto); 
  //   return {message: 'Archivo subido', filepath: file.path};
  // }

async findAll(
  page: number = 1,
  limit: number = 10,
  search: string = '',
  sortBy: string = 'id',
  order: 'ASC' | 'DESC' = 'ASC',
  almacenId?: number,
  activo: boolean = true
): Promise<PaginatedProductoResponseDto> {

  console.log('==================== PARÁMETROS RECIBIDOS ====================');
  console.log({
    page,
    limit,
    search,
    sortBy,
    order,
    almacenId,
    activo
  });

  // Conversión de parámetros
  page = Number(page);
  limit = Number(limit);
  almacenId = almacenId ? Number(almacenId) : undefined;

  const queryBuilder = this.productoRepository.createQueryBuilder('producto')
    .leftJoinAndSelect('producto.categoria', 'categoria')
    .leftJoinAndSelect('producto.almacenes', 'almacenProducto')
    .leftJoinAndSelect('almacenProducto.almacen', 'almacen')
    .where('(producto.nombre LIKE :search OR producto.marca LIKE :search)', {
      search: `%${search}%`
    })
    .andWhere('producto.activo = :activo', { activo });

  if (almacenId) {
    queryBuilder.andWhere('almacen.id = :almacenId', { almacenId });
  }

  // Mostrar consulta SQL generada
  console.log('==================== CONSULTA SQL ====================');
  console.log(queryBuilder.getSql());

  queryBuilder
    .orderBy(`producto.${sortBy}`, order)
    .skip((page - 1) * limit)
    .take(limit);

  const [productos, total] = await queryBuilder.getManyAndCount();
  const totalPages = Math.ceil(total / limit);

  // Mostrar resultados obtenidos
  console.log('==================== RESULTADOS OBTENIDOS ====================');
  console.log('Total de productos:', total);
  console.log('Productos en esta página:', productos.length);
  
  if (productos.length > 0) {
    console.log('Ejemplo de primer producto:', {
      id: productos[0].id,
      nombre: productos[0].nombre,
      almacenes: productos[0].almacenes?.map(a => ({
        almacenId: a.almacen?.id,
        almacenNombre: a.almacen?.nombre,
        cantidad: a.cantidad_actual
      })) || []
    });
  }

  const response = {
    data: productos,
    total,
    page,
    limit,
    totalPages,
    sortBy,
    order,
    almacen: almacenId,
    activo,
    search
  };

  console.log('==================== RESPUESTA FINAL ====================');
  console.log(JSON.stringify(response, null, 2));

  return response;
}



  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({where: {id}});
    if (!producto) throw new NotFoundException(`El producto no encontrado`);
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.findOne(id);

    if (updateProductoDto.categoriaId) {
      const categoria = await this.categoriaRepository.findOne({where: {id: updateProductoDto.categoriaId}});
      if (!categoria) throw new NotFoundException(`La categoria no existe`);
      producto.categoria = categoria;
    }
    
    Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(producto);
  }

  async remove(id: number) {

    const producto = await this.findOne(id);
    if (!producto) throw new NotFoundException(`El producto no encontrado`);
    producto.activo = false;
    await this.productoRepository.save(producto);
  }
}
