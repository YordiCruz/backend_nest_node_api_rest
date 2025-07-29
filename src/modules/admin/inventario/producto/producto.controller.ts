import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}


  //imagenes

   @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' debe coincidir con el nombre en tu request
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    return this.productoService.subidaImagen(file, id);
  }



  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  @Post(':id/actualizar-imagen')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })

  )
  uploadfile(@UploadedFile() file: Express.Multer.File, @Param('id') id: number) {
    return this.productoService.subidaImagen(file, id);
  }

  // /api/productos?almacen=1&page=1&limit=10&search=abc
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('sortBy') sortBy: string = 'id',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
    @Query('almacen') almacen: number = 0,
    @Query('activo') activo: boolean = true

  ) {
    return this.productoService.findAll(page, limit, search, sortBy, order, almacen, activo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}
