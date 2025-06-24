import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>
  ) {}
  
  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  /**
   * esta funcion retorna un listado de categorias
   * @returns listado de categorias
   */

  async findAll(): Promise<Categoria[]> {

    return this.categoriaRepository.find();
  }

  /**
   * esta funcion retorna una categoria especifica
   * @param id id de la categoria
   * @returns retorna una categoria especifica
   */
 async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOneBy({id});
    if (!categoria) {
      throw new NotFoundException(`La categoria no existe`);
    }
    return categoria;
  }

 async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);    
    this.categoriaRepository.merge(categoria, updateCategoriaDto);

    return this.categoriaRepository.save(categoria);
  }

  async remove(id: number) {
    const result = await this.categoriaRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`La categoria no fue encontrada`);
    }}
}
